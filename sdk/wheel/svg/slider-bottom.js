import { WheelUtils } from "./wheel-utils.js"
import { sizing } from "./sizing.js"

export class SliderBottom extends WheelUtils {
    instructions() {
        this.sizing = sizing.sliderBottom()

        this.name(this.sizing, this.table)
        this.header(this.sizing, this.table)
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
        this.charCircle(inputs, (outer + inner) / 4 - 0.3, 0, {
            "font-size": heading,
        })
    }

    delimiters({ outer, inner }) {
        this.circle(outer)
        this.circle(inner)
        this.cross(0.6, { color: "black", width: 0.1 })
    }
}

customElements.define("slider-bottom", SliderBottom)
