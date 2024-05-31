import { WheelUtils } from "./wheel-utils.js"
import { CombinedTop } from "./combined-top.js"
import { CombinedBottom } from "./combined-bottom.js"
import { sizing } from "./sizing.js"

class CombinedSvg extends WheelUtils {
    instructions() {
        // TODO: rename?
        this.sizing = sizing.slider2()
        this.top(this.table)
        this.bottom(this.table)
    }

    top(table) {
        const nested = this.nest(CombinedTop, { table })

        const { width, height, padding } = sizing.sliderTop()
        nested.size(width, height + padding)
        nested.center(0, -padding * 0.5)

        console.log({ width, height })

        const group = this.draw.group()
        group.add(nested)

        // TODO: this was found by trial & error. Let's do the maths.
        const translate = [
            (width + 0.8 * padding - this.sizing.width) / 2,
            height - this.sizing.height,
        ]
        group.transform({ translate, rotate: -90 })

        return group
    }

    bottom(table) {
        const nested = this.nest(CombinedBottom, { table })

        const { width, height, padding } = sizing.sliderBottom()
        nested.size(width, height + padding)
        nested.center(0, -padding * 0.5)

        const group = this.draw.group()
        group.add(nested)

        const translate = [
            (width - this.sizing.width) / 2,
            (this.sizing.height - height) / 2,
        ]
        group.transform({ translate, rotate: -90 })

        return group
    }
}

customElements.define("combined-svg", CombinedSvg)
