import { WheelUtils } from "./wheel-utils.js"
import { sizing } from "./sizing.js"

export class VolvelleTop extends WheelUtils {
    instructions() {
        this.sizing = sizing.volvelleTop()
        this.sizing.spiral = {
            branches: 3,
            rot: -71,
            factor: -124,
            padding: 4,
            spacing: 0,
        }

        this.cursor(this.sizing, this.table)
        this.background(this.sizing, this.table)
        this.combination(this.sizing, this.table)
        this.data(this.sizing, this.table)
        this.delimiters(this.sizing)

        // DEV: to verify alignment
        // this.header(this.sizing, this.table)
        // this.bottom(this.table)
    }

    header({ outer, inner, heading }, { xs }) {
        this.charCircle(xs, (outer + inner) / 4 - 0.3, -0.2, {
            "font-size": heading,
            "letter-spacing": -0.2,
        })
    }

    bottom({ matrix }) {
        this.charSpiral(matrix.map((x) => x.slice(0, 1)))
    }

    /* Components */

    cursor({ header, inner }, { cursor = "▼" }) {
        this.rectangle(0, -inner / 2, header, header * 2, {
            fill: "lightgray",
        }).radius(0.8)
        this.rectangle(0, -inner / 2 - 1, 1.6, 1.8, {})

        this.text(cursor, 0, 0, {
            x: 0,
            y: -inner / 2 - (header * 2) / 3,
            "font-size": 2.6,
        })
    }

    combination({ inner }, { xs }) {
        const arrows = Array(xs.length).fill("▲")
        this.charCircle(arrows, (inner + 0.3) / 2, 0, {
            fill: "white",
            "fill-opacity": 0.4,
            "font-size": 3.6,
        })

        const labels = xs.map((val) => `+${val}`)
        this.charCircle(labels, (inner - 1.4) / 2, -0.2, {
            "font-size": 0.8,
            "letter-spacing": -0.1,
            "margin-left": 1,
        })
    }

    delimiters({ inner }) {
        this.circle(inner)
        this.cross(0.6, { color: "white", width: 0.1 })
    }

    data(sizing, { ys }) {
        this.forSpiral(ys.length, (x, y, i) => {
            this.label(sizing, x, y, ys[i])
        })
        this.forSpiral(ys.length, (x, y) => {
            this.window(sizing, x, y)
        })
    }

    label({ window }, x, y, char) {
        this.rectangle(x - window - 0.2, y, 1.6, window + 0.05, {
            "fill-opacity": 0.8,
        })
        // this.text(`${char}→`, x - 1.95, y)
        this.text(`${char}`, x - 1.9, y)
        this.text("→", x - 1.2, y - 0.05)
    }

    window({ window }, x, y) {
        // Draw
        this.rectangle(x, y, window, window, {
            stroke: "black",
            "stroke-width": "0.05px",
        })
    }
}

customElements.define("volvelle-top", VolvelleTop)
