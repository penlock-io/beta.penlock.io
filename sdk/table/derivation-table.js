import { GridlessTable } from "./gridless-table.js"

export class DerivationTable extends GridlessTable {
    render(html) {
        this.k ??= 3
        this.m ??= 5
        this.table = globalThis.codex.makeDerivationTable(this.k, 26)
        return super.render(html)
    }
}

customElements.define("derivation-table", DerivationTable)
