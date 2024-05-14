export class WheelBase extends El {
    constructor({ draw = SVG() } = {}) {
        super()
        this.draw = draw
    }

    render() {
        this.instructions()

        const { width, height, padding } = this.sizing
        this.draw.viewbox(
            -width / 2,
            -height / 2 - padding,
            width,
            height + padding,
        )
        return this.draw.node.outerHTML
    }

    instructions() {
        this.text("Please add instructions() in your SVG Constructor")
    }

    scale(height = this.height, width = this.width) {
        this.draw.viewbox(0, 0, width, height)
    }

    nest(Class, attrs) {
        const nested = this.draw.nested()
        const instance = new Class({ draw: nested })
        Object.assign(instance, attrs)
        instance.render()
        return nested
    }

    styles(css) {
        return css`
            svg {
                font-family: var(--monospace);
                font-size: 1px;
            }

            circle {
                stroke-width: 0.05;
                stroke: black;
            }

            // rect {
            //     stroke-width: 0.05;
            //     stroke: black;
            // }

            text {
                text-anchor: middle;
                dominant-baseline: central;
            }
        `
    }
}
