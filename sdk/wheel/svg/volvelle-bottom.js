import { WheelUtils } from "./wheel-utils.js"

import { sizing } from "./sizing.js"

export class VolvelleBottom extends WheelUtils {
    instructions() {
        this.sizing = sizing.volvelleBottom()
        this.sizing.spiral = {
            branches: 3,
            rot: -71,
            factor: -124,
            padding: 4,
            spacing: 0,
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

    header({ outer, inner, heading }, { xs }) {
        this.charCircle(xs, (outer + inner) / 4 - 0.3, -0.2, {
            "font-size": heading,
            "letter-spacing": -0.2,
        })
    }

    data(_, { matrix }) {
        this.charSpiral(matrix)
    }

    delimiters({ outer, inner }) {
        this.cross(0.6, { color: "black", width: 0.1 })
        this.circle(outer)
        this.circle(inner)
    }
}

customElements.define("volvelle-bottom", VolvelleBottom)
