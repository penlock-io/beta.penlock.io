import "./svg/slider-svg.js"

class SliderSheet extends El {
    render(html) {
        return html`
            <section class="sheet">
                <slider-svg
                    table=${this.table}
                    model=${this.model}
                ></slider-svg>
            </section>
        `
    }
}

customElements.define("slider-sheet", SliderSheet)
