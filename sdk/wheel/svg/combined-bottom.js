import { SliderBottom } from "./slider-bottom.js"
import { polar } from "./wheel-utils.js"
import { sizing } from "./sizing.js"

export class CombinedBottom extends SliderBottom {
    instructions() {
        this.sizing = sizing.sliderBottom()
        this.sizing.spiral = {
            branches: 4,
            rot: 0,
            factor: 94.15,
            padding: 4,
            spacing: 2,
        }

        this.name(this.sizing, this.table)
        this.header(this.sizing, this.table)
        this.data(this.sizing, this.table)
        this.delimiters(this.sizing)
    }

    name({ outer }, { name }) {
        this.forAngle(8, 0, (rotation) => {
            this.text(name, 0, -outer / 2 + 0.4)
                .attr({ "font-size": "60%" })
                .rotate(rotation, 0, 0)
        })
    }

    header({ outer, inner, heading }, { inputs }) {
        this.charCircle(inputs, (outer + inner) / 4 - 0.3, -0.2, {
            "font-size": heading,
        })
    }

    data(sizing) {
        this.spiral()
        this.recovery(sizing)
    }

    spiral() {
        const matrix = globalThis.codex.div.matrix.slice(1, 14).reverse()
        this.charSpiral(matrix)
    }

    recovery() {
        const { inner, window } = sizing.sliderTop()

        // TODO: generalize instead of hard-coding parameters.
        const length = 29
        const radius = inner / 2 - window * 0.5
        const angle = 180

        const labels = Array.from({ length })
            .map((_, i) => {
                if (i <= 13) return i + 1
                else return "-"
            })
            .reverse()

        this.charCircle(labels, radius, angle + 0.4, {
            "letter-spacing": -0.2,
            "font-size": "0.8em",
        })

        this.forAngle(length, angle, (angle) => {
            const { x, y } = polar(radius, angle)
            this.circle(0.9, {
                cx: x,
                cy: y,
            })
        })
    }

    delimiters({ outer, inner }) {
        this.circle(outer)
        this.circle(inner)
        this.cross(0.6, { color: "black", width: 0.1 })
    }
}

customElements.define("combined-bottom", CombinedBottom)
