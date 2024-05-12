import { Charset } from "./charset.js"
import { GaloisField } from "./galois/p.js"
import { Table } from "./table.js"
import { Wordlist } from "./wordlist.js"

export class Codex {
    constructor(params) {
        this.galois = new GaloisField(params.galois)
        this.wordlist = new Wordlist(params.wordlist)
        this.secret = params.secret
        this.wheels = params.wheels

        if (params.baseset) {
            const entries = Array.from(params.baseset, (x, i) => [x, i])
            this.liteset = new Charset(entries)
            this.charset = new Charset(entries)

            const entries2 = Array.from(params.baseset, (_, i) => [`${i}`, i])
            this.altset = new Charset(entries2).without(0)
        } else {
            this.liteset = new Charset(params.liteset)
            this.altset = new Charset(params.altset).without(0)
            this.charset = new Charset(params.charset)
        }
        this.altset = new Charset(params.altset).without(0)

        // Tiles TODO: make this a namespace
        {
            const extra = params.extraTiles ?? []
            this.tiles = [...this.charset.keys(), ...extra]
            this.tilesHints = params.hintTiles ?? []
        }

        // Merge Table
        this.merge = new Table({
            name: "merge",
            charset: this.charset,
            operation: this.galois.add.bind(this.galois),
        })

        // Translate Table
        this.translate = new Table({
            name: "translate",
            charset: this.charset,
            xs: this.altset,
            operation: this.galois.mul.bind(this.galois),
        })
        // Translate Slide Rule (TODO: generalize)
        this.translate.inputs = this.translate.matrix[0]
        this.translate.outputs = this.translate.inputs

        // Combine Table
        this.combine = new Table({
            name: "combine",
            charset: this.altset,
            operation: this.galois.mul.bind(this.galois),
        })
        // Combine Slide Rule (TODO: generalize)
        this.combine.inputs = this.combine.matrix[0]
        this.combine.outputs = this.combine.inputs
        this.combine.reverse = true

        // Recover Table
        this.recover = new Table({
            name: "recover",
            charset: this.altset,
            xs: this.charset.without(this.secret),
            ys: this.charset.without(this.secret),
            operation: (translated, other) => {
                if (translated == other) return
                return this.galois.basis(this.secret, translated, other)
            },
        })
        // TODO: this works but this is hacky. Clean up & generalize.
        this.recover.inputs = this.translate.inputs.map((x) => {
            if (x == "+" || x == "-") return ""
            else return x
        })
        this.recover.outputs = this.translate.inputs.map((char) => {
            if (!char) return
            const i = this.recover.xs.indexOf(char)
            return this.recover.matrix[i][0]
        })

        if (!this.liteset) return

        // Sum
        this.sum = new Table({
            name: "sum",
            charset: this.liteset,
            operation: (a, b) => {
                return (a + b) % this.liteset.size
            },
        })
        // this.sum.reverse = true
        this.sum.inputs = this.sum.matrix[0]
        this.sum.outputs = this.sum.inputs

        this.div = new Table({
            name: "div",
            charset: this.liteset,
            ys: this.liteset.without(0),
            operation: this.galois.div.bind(this.galois),
        })
    }

    optimize() {
        const charset = new Charset(this.charset)
        charset.ingest([0, ...this.galois.shifts])
        const altset = new Charset(this.altset)
        altset.ingest(this.galois.shifts)

        const codex = new Codex({ ...this, charset, altset })
        return codex
    }

    makeDerivationTable(k, m = this.galois.size) {
        const deriset = this.liteset.without(1)
        const ys = deriset.slice(0, k)
        const xs = deriset.slice(k, m + 1)

        const table = new Table({
            name: "derivation",
            charset: this.altset,
            xs,
            ys,
            operation: (derived, tweaked) => {
                const others = [...ys.without(tweaked).values()]
                return this.galois.basis(derived, tweaked, ...others)
            },
        })

        table.ys = table.ys.map((char) => `Share ${char}`)
        table.ys[0] = "Secret"

        return table
    }

    makeRecoveryTable() {}
}
