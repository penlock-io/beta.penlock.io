import "./combined-sheet.js"
import "./slider-sheet.js"
import "./volvelle-sheet.js"

class WheelSheet extends El {
    render(html) {
        const data = globalThis.codex.wheels[this.name]
        if (!data) {
            throw new Error(`Can't find wheel data: ${this.name}`)
        }

        const { type } = data
        const table = Object.assign({}, data, globalThis.codex[data.table])
        table.image = this.background
        table.name = this.name
        console.log({ table })
        return html`
            <${type}-sheet table=${table}></${type}-sheet>
        `
    }
}

customElements.define("wheel-sheet", WheelSheet)
