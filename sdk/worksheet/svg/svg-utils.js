export class SvgUtils extends El {
    constructor(params) {
        super()
        Object.assign(this, { draw: SVG(), ...params })
    }

    scale(height = this.height, width = this.width) {
        this.draw.viewbox(0, 0, width, height)
    }

    render() {
        this.instructions()
        return this.draw.node.outerHTML
    }

    instructions() {
        this.text("Please add instructions() in your SVG Constructor")
    }

    styles(css) {
        return css`
            svg {
                font-family: var(--monospace);
                font-size: 3px;
            }

            text {
                text-anchor: middle;
                dominant-baseline: central;
            }

            line {
                fill: #fff;
                stroke: #000;
                stroke-width: 0.2px;
            }
        `
    }

    /* Composition */

    nest(Class, params) {
        const draw = this.draw.nested()
        const nested = new Class({ draw, ...params })
        nested.render()
        return draw
    }

    /* Utils */

    text(string, x = 0, y = 0) {
        return this.draw.plain(string).attr({ x, y })
    }
}
