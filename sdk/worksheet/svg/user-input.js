import { SvgUtils } from "./svg-utils.js"

export class UserInput extends SvgUtils {
    styles(css) {
        return css`
            :host {
                display: inline-block;
            }

            svg {
                height: 1.6em;
            }

            line {
                fill: #fff;
                stroke: #000;
                stroke-width: 0.4px;
                stroke-dasharray: 0.333, 0.666;
            }
        `
    }
    instructions() {
        const x = 0.166
        const y = 10

        if (this.greyed) {
            const span = this.greyed.split(",")
            this.shadow({ x, y, span })
        }

        const { length } = this
        this.input({ x, y, length })

        if (this.value) {
            this.prefill({ x, y, value: this.value })
        }

        this.scale(10.166, 0.5 + (length * 80) / 8)
    }

    shadow({ x, y, span: [start, length] }) {
        x += -0.166 + start * 10
        y += 0.166

        const width = length * 10 + 0.5
        const height = 10
        return this.draw.rect({
            x: x,
            y: y - height,
            width,
            height,
            fill: "#eee",
        })
    }

    input({ x, y, length }) {
        // Parameters
        const size = length

        const width = size * 10
        this.baseline({ x, y, width })

        for (let i = 0; i <= size; i++) {
            const height = 4
            this.charline({ x: x + i * 10, y, height })
        }
    }

    prefill({ x, y, value }) {
        const attrs = {
            x: x + 4,
            y: y - 3,
            fill: "grey",
            "font-size": 6,
        }
        for (let i = 0; i <= value.length; i++) {
            this.text(value[i], attrs)
            attrs.x += 10
        }
    }

    /* Helpers */

    text(string, attrs) {
        return this.draw.plain(string).attr(attrs)
    }

    baseline({ x, y, width }) {
        return this.draw.line(x, y, x + width, y)
    }

    charline({ x, y, height }) {
        x += 0.166
        y += 0.166
        return this.draw.line(x, y, x, y - height)
    }
}
customElements.define("user-input", UserInput)
