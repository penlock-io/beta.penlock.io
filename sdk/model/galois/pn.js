/* Definition */
// Took inspiration from: https://www.npmjs.com/package/jqr-gf?activeTab=code

export class GaloisField {
    constructor({ prime, degree, primitive }) {
        this.prime = prime
        this.degree = degree
        this.primitive = primitive
        this.size = prime ** degree
    }

    /* Lagrange */
    // FIXME: move generic utils to a shared class?

    // Lagrange polynomial basis
    basis(derived, translated, ...others) {
        return others.reduce((product, other) => {
            const numerator = this.sub(derived, other)
            const denominator = this.sub(translated, other)
            return this.mul(product, this.div(numerator, denominator))
        }, 1)
    }

    /* Field operations */

    add(a, b) {
        if (a == 0) return b
        if (b == 0) return a

        const splitA = this.split(a)
        const splitB = this.split(b)
        const splitC = Array(Math.max(splitA.length, splitB.length))

        for (let i = 0; i < splitC.length; i++) {
            splitC[i] = ((splitA[i] ?? 0) + (splitB[i] ?? 0)) % this.prime
        }

        return this.glue(splitC)
    }

    sub(a, b) {
        return this.add(a, this.minus(b))
    }

    minus(a) {
        return this.opposites[a]
    }

    mul(a, b) {
        if (a == 0 || b == 0) return 0

        const log = (this.log(a) + this.log(b)) % (this.size - 1)
        return this.exp(log)
    }

    div(a, b) {
        return this.mul(a, this.inv(b))
    }

    log(a) {
        if (a == 0) throw Error("Invalid operation: logarithm of 0")
        return this.logarithms[a]
    }

    exp(a) {
        return this.exponentials[a]
    }

    inv(a) {
        if (a == 0) throw Error("Invalid operation: division by 0")
        return this.reciprocals[a]
    }

    /* Tables, delayed evaluation */

    get opposites() {
        const opposites = new Array(this.size)

        for (let i = 0; i < this.size; i++) {
            const splitted = this.split(i).map((x) => {
                return (this.prime - x) % this.prime
            })
            opposites[i] = this.glue(splitted)
        }

        return this.$memoize("opposites", opposites)
    }

    get exponentials() {
        const exponentials = new Array(this.size)

        let x = 1
        for (let i = 0; i < this.size; i++) {
            exponentials[i] = x
            x = x * this.prime
            while (x >= this.size) {
                x = this.add(x, this.primitive)
            }
        }

        return this.$memoize("exponentials", exponentials)
    }

    get logarithms() {
        const logarithms = new Array(this.size)

        for (let i = 0; i < this.size - 1; i++) {
            logarithms[this.exponentials[i]] = i
        }

        return this.$memoize("logarithms", logarithms)
    }

    get reciprocals() {
        const reciprocals = new Array(this.size)

        for (let i = 1; i < this.size; i++) {
            reciprocals[i] = this.exp(this.size - 1 - this.log(i))
        }

        return this.$memoize("reciprocals", reciprocals)
    }

    get shifts() {
        const shifts = new Array(this.size - 1)

        this.exponentials.forEach((x, i) => {
            const position = (i * 3) % (this.size - 1)
            shifts[position] = x
        })

        return this.$memoize("shifts", shifts)
    }

    /* Helpers */

    split(glued) {
        const splitted = []
        while (glued > 0) {
            splitted.push(glued % this.prime)
            glued = Math.floor(glued / this.prime)
        }
        return splitted
    }

    glue(splitted) {
        let glued = 0
        splitted.forEach((x, i) => {
            glued += x * this.prime ** i
        })
        return glued
    }

    /* Special */
    $memoize(key, value) {
        Object.defineProperty(this, key, { value })
        return value
    }
}

/* Helpers */

// function memoize(x) {}
