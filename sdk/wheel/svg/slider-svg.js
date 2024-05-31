import { WheelUtils } from "./wheel-utils.js"
import { SliderTop } from "./slider-top.js"
import { SliderBottom } from "./slider-bottom.js"
import { sizing } from "./sizing.js"

class SliderSvg extends WheelUtils {
    instructions() {
        // TODO: rename?
        this.sizing = sizing.slider2()
        this.top(this.table)
        this.bottom(this.table)
    }

    top(table) {
        const nested = this.nest(SliderTop, { table })

        const { width, height, padding } = sizing.sliderTop()
        nested.size(width, height + padding)
        nested.center(0, -padding * 0.5)

        const group = this.draw.group()
        group.add(nested)

        const translate = [
            (this.sizing.width - width - padding) / 2 - 1,
            (width - this.sizing.height) / 2 - padding - 0.5,
        ]
        group.transform({ translate, rotate: -90 })

        return group
    }

    bottom(table) {
        const nested = this.nest(SliderBottom, { table })

        const { width, height, padding } = sizing.sliderBottom()
        nested.size(width, height + padding)
        nested.center(0, -padding * 0.5)

        const group = this.draw.group()
        group.add(nested)

        // TODO: this was found by trial & error. Let's do the maths.
        const translate = [
            (width - this.sizing.width) / 2 + 1,
            (this.sizing.height - height) / 2 - 0.5,
        ]
        group.transform({ translate, rotate: -90 })

        return group
    }
}

customElements.define("slider-svg", SliderSvg)
