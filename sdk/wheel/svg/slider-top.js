import { WheelUtils } from "./wheel-utils.js"

import { sizing } from "./sizing.js"

export class SliderTop extends WheelUtils {
    instructions() {
        this.sizing = sizing.sliderTop()
        this.cursor(this.sizing, this.table)
        this.header(this.sizing, this.table)
        this.background(this.sizing, this.table)
        this.delimiters(this.sizing)

        // DEV: to verify alignment
        // const { outer, inner, heading } = sizing.sliderBottom()
        // const { inputs } = this.table
        // this.charCircle(inputs, (outer + inner) / 4 - 0.3, 0, {
        //     "font-size": heading,
        // })
    }

    /* Components */

    cursor({ header, outer }, { cursor = "▼", number = null }) {
        this.rectangle(0, -outer / 2, header, header * 2, {
            fill: "lightgray",
        }).radius(0.8)
        this.rectangle(0, -outer / 2 - 1, 1.6, 1.8, {})
        this.circle(outer, { fill: "white" })

        this.text(cursor, 0, 0, {
            x: 0,
            y: -outer / 2 - (header * 2) / 3,
            "font-size": 2.6,
        })
    }

    header({ outer, inner, heading }, { reverse, outputs }) {
        const arrows = Array(outputs.length).fill(reverse ? "▲" : "▼")
        if (!outputs[0]) {
            arrows[0] = undefined
            this.pointer(outer, "share", "to tweak")
        }

        this.charCircle(arrows, (outer - 0.5) / 2, 0)
        this.charCircle(outputs, (outer + inner) / 4 - 0.4, 0, {
            "font-size": heading,
            "letter-spacing": -0.1,
        })
    }

    pointer(outer, text1, text2) {
        const attrs = { "font-size": "80%", "letter-spacing": -0.04 }
        this.text("↑", 0, -outer / 2 + 0.4)
        this.text(text1, 0, -outer / 2 + 1.2, attrs)
        this.text(text2, 0, -outer / 2 + 2, attrs)
    }

    delimiters({ outer, inner }) {
        this.circle(outer)
        this.circle(inner)
        this.cross(0.6, { color: "white", width: 0.1 })
    }
}

customElements.define("slider-top", SliderTop)
