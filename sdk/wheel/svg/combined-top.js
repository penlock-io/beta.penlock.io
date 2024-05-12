import { SliderTop } from "./slider-top.js"
import { sizing } from "./sizing.js"

export class CombinedTop extends SliderTop {
    instructions() {
        this.sizing = sizing.sliderTop()
        this.sizing.spiral = {
            branches: 4,
            rot: 0,
            factor: 94.15,
            padding: 4,
            spacing: 2,
        }

        this.cursor(this.sizing, { cursor: "①" })
        this.header(this.sizing, this.table)
        this.background(this.sizing, this.table)
        this.data(this.sizing)
        this.delimiters(this.sizing)

        // DEV: To verify alignment
        // this.bottom()
    }

    /* Components */

    header({ outer, inner, heading }, { reverse, outputs }) {
        const arrows = Array(outputs.length).fill(reverse ? "▲" : "'")
        this.charCircle(arrows, (outer - 0.9) / 2, 0)
        this.charCircle(outputs, (outer + inner) / 4 - 0.4, -0.2, {
            "font-size": heading,
            "letter-spacing": -0.1,
        })
    }

    bottom() {
        const position = 0
        const matrix = globalThis.codex.div.matrix.slice(1, 14).reverse()
        this.charSpiral(matrix.map((x) => x.slice(position, position + 1)))
    }

    hint(outer, text1, text2) {
        const attrs = { "font-size": "80%", "letter-spacing": -0.04 }
        this.text("↑", 0, -outer / 2 + 0.4)
        this.text(text1, 0, -outer / 2 + 1.2, attrs)
        this.text(text2, 0, -outer / 2 + 2, attrs)
    }

    data(sizing) {
        this.spiral(sizing)
        this.recovery(sizing)
    }

    spiral(sizing) {
        const length = 13

        this.forSpiral(length, (x, y, i) => {
            const number = length - i + 1
            this.label(sizing, x, y, number)
        })
        this.forSpiral(length, (x, y, i) => {
            const number = length - i + 1
            const attrs = number == 2 ? {} : { "fill-opacity": 0.4 }
            this.window(sizing, x, y, attrs)
        })
    }

    recovery({ inner, window }) {
        const width = 4.7
        const y = inner / 2 - window * 0.5

        this.rectangle(0, y - window, width, window, { "fill-opacity": 0.6 })
        this.text("Recovery", 0, y - window, { "letter-spacing": -0.1 })
        this.window({ window }, 0, y)
    }

    delimiters({ outer, inner }) {
        this.circle(outer)
        this.circle(inner)
        this.cross(0.6, { color: "white", width: 0.1 })
    }

    /* Helpers */

    label({ window }, x, y, char) {
        this.rectangle(x - window - 0.1, y, 1.5, window + 0.05, {
            "fill-opacity": 0.8,
        })
        this.circledNumber(x - 1.4, y, char)
    }

    window({ window }, x, y, attrs) {
        // Draw
        this.rectangle(x, y, window, window, {
            stroke: "black",
            "stroke-width": "0.05px",
            ...attrs,
        })
    }

    circledNumber(x, y, number, rotation) {
        this.circle(1.1, { cx: x, cy: y })
        const text = this.text(number, x - 0.1, y, {
            "letter-spacing": -0.2,
            "font-size": "0.9em",
        })
        if (rotation) {
            text.rotate(rotation, x - 0.1, y)
        }
    }
}

customElements.define("combined-top", CombinedTop)
