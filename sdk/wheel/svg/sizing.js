class Sizing {
    constructor(params) {
        // FIXME: width/height derived from outer unless specified?

        this.header = params.header
        this.heading = params.heading
        this.outer = params.outer
        this.shrink = params.shrink
        this.window = params.window

        this.padding = params.padding ?? 0

        this.inner = this.outer - this.header
        this.height = (this.outer + this.padding) * 1.02
        this.width = this.outer * 1.02
    }

    volvelleBottom() {
        return this
    }

    volvelleTop() {
        const padding = this.header
        return new Sizing({ ...this, padding })
    }

    sliderBottom() {
        const outer = (this.outer * this.shrink) / 100
        // const window = (this.window * this.shrink) / 100
        const window = this.window
        return new Sizing({ ...this, outer, window })
    }

    sliderTop() {
        const bottom = this.sliderBottom()
        const outer = bottom.outer - bottom.header
        const padding = bottom.header
        return new Sizing({ ...bottom, outer, padding })
    }

    slider2() {
        const sizing = new Sizing(this)
        sizing.width = this.width
        const margin = 0.635 * 2
        sizing.height = (sizing.width * (29.7 - margin)) / (21 - margin)
        return sizing
    }
}

export const sizing = new Sizing({
    outer: 53,
    header: 5,
    heading: "140%",
    // shrink: 77.5,
    shrink: 78,
    window: 1.3,
})

export const sizing27 = new Sizing({
    outer: 49,
    header: 5,
    heading: "140%",
    // shrink: 75.1, // For top
    shrink: 73.5, // For bottom
    window: 1.3,
})

export const sizing32 = new Sizing({
    outer: 55,
    header: 5,
    heading: "140%",
    shrink: 75,
    window: 1.3,
})
