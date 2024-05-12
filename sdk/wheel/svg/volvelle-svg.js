import { VolvelleUtils } from "./volvelle-utils.js"
import { VolvelleBottom } from "./volvelle-bottom.js"
import { VolvelleTop } from "./volvelle-top.js"

class VolvelleSvg extends VolvelleUtils {
    constructor({ width = 210, height = 297 } = {}) {
        super({ width, height })

        this.height = height
        this.width = width
    }

    instructions() {
        const size = 155
        this.top(size)
        this.bottom(size)
    }

    top(size) {
        const nested = this.nest(VolvelleTop, { table: this.table })
        nested.size(size, size).move(-this.width / 2, this.height / 2 - size)
    }

    bottom(size) {
        const nested = this.nest(VolvelleBottom, { table: this.table })
        nested.size(size, size).move(this.width / 2 - size, -this.height / 2)
    }
}

customElements.define("volvelle-svg", VolvelleSvg)
