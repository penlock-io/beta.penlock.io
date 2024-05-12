import "./svg/combined-svg.js"

class CombinedSheet extends El {
    render(html) {
        return html`
            <section class="sheet">
                <combined-svg table=${this.table}></combined-svg>
            </section>
        `
    }
}

customElements.define("combined-sheet", CombinedSheet)
