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
            (this.sizing.width - width) / 2,
            (height - padding - this.sizing.height) / 2,
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

        const translate = [
            (width - this.sizing.width) / 2,
            (this.sizing.height - height) / 2,
        ]
        group.transform({ translate, rotate: -90 })

        return group
    }

    place(sizing, nested, sign) {
        const { width, height, padding } = sizing
        nested.size(width, height + padding)
        nested.center(0, -padding * 0.5)
        return this.transform(sizing, nested, sign)
    }

    transform(sizing, nested, sign) {
        const group = this.draw.group()
        group.add(nested)

        const { width, outer, padding } = sizing
        const distance = 0.989 * (outer / 2 + padding)
        const ratio = (this.sizing.height - width) / (this.sizing.width - width)
        const a = distance / Math.sqrt(1 + ratio ** 2)
        const b = a * ratio

        const translate = [a * sign, -b * sign]
        const rotate = -Math.atan2(-b, -a) * (180 / Math.PI) + 90 * sign
        group.transform({ rotate, translate })

        return group
    }
}

customElements.define("slider-svg", SliderSvg)
