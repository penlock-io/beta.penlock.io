import { WheelBase } from "./wheel-base.js"

export class WheelUtils extends WheelBase {
    /* High Level */
    background({ outer, inner }, { image }) {
        // White by default, in case image is missing.
        // TODO: merge with background and return together, or make background be white on error.
        this.draw.circle(inner).fill("white").center(0, 0)

        // Clipper
        const circle = this.draw.circle(inner)
        const clip = this.draw.clip()
        clip.add(circle.center(0, 0))

        // Background
        const background = this.draw.image(image)
        background
            .size(outer, outer)
            .move(-outer / 2, -outer / 2)
            .attr({ onerror: "this.style.display='none'" })
            .clipWith(clip)

        return background
    }

    /* Drawing Tools */

    charSpiral(values, attrs) {
        this.forSpiral(values.length, (x, y, i) => {
            const sequence = values[i]
            if (!sequence) return

            this.forAngle(sequence.length, 0, (rotation, i) => {
                this.text(sequence[i], x, y, attrs).rotate(rotation, 0, 0)
                // DEV: to verify spacing
                // const fontSize = 1
                // this.rectangle(x, y, fontSize, fontSize, {
                //     fill: "transparent",
                //     stroke: "black",
                //     "stroke-width": 0.05,
                // }).rotate(rotation, 0, 0)
            })
        })
    }

    charCircle(values, radius, angle, attrs) {
        const { x, y } = polar(radius, angle)
        this.forAngle(values.length, 0, (rotation, i) => {
            this.text(values[i], x, y, attrs).rotate(rotation, 0, 0)
        })
    }

    /* Utils */

    forSpiral(length, callback) {
        // TODO: pass this as parameters?
        const { branches, rot, factor, padding, spacing } = this.sizing.spiral

        const size = length / branches
        const pad = (i) => padding * Math.sqrt(i + 2)
        const base = (1.2 * length) / (2 * Math.PI) - pad(0) + spacing

        for (let i = 0; i < length; i++) {
            const radius = base + pad(i)
            const angle = i * factor + rot
            const { x, y } = polar(radius, angle)

            const branch = i % branches
            const step = Math.floor(i / branches)
            const skip = Math.ceil(branch * size)
            const index = length - (skip + step) - 1

            callback(x, y, index)
        }
    }

    forAngle(count, start, callback) {
        const step = 360 / count
        for (let i = 0; i < count; i++) {
            const angle = start + i * step
            callback(angle, i)
        }
    }

    /* Helpers */

    text(string, x = 0, y = 0, attrs) {
        return this.draw.plain(string).attr({ x, y, ...attrs })
    }

    circle(radius, attrs) {
        const defaults = { cx: 0, cy: 0, fill: "transparent" }
        attrs = Object.assign({}, defaults, attrs)
        this.draw.circle(radius).attr(attrs)
    }

    cross(size = 5, attrs) {
        this.draw.line(0, -size, 0, size).stroke(attrs)
        this.draw.line(-size, 0, size, 0).stroke(attrs)
    }

    rectangle(cx, cy, width, height, attrs) {
        return this.draw.rect(width, height).attr({
            x: round(cx - width / 2).toFixed(2),
            y: round(cy - height / 2).toFixed(2),
            fill: "white",
            ...attrs,
        })
    }
}

/* Helpers */

export function polar(radius, angle) {
    return {
        x: round(radius * sinus(angle)),
        y: round(-radius * cosinus(angle)),
    }
}

function cosinus(angle) {
    return Math.cos(radians(angle))
}

function sinus(angle) {
    return Math.sin(radians(angle))
}

function radians(angle) {
    return angle * (Math.PI / 180)
}

function round(n) {
    return Math.round(n * 100) / 100
}
