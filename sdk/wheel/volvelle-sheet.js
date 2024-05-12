import "./svg/volvelle-bottom.js"
import "./svg/volvelle-top.js"

class VolvelleSheet extends El {
    render(html) {
        return html`
            <section class="sheet">
                <volvelle-top table=${this.table}></volvelle-top>
            </section>
            <section class="sheet">
                <volvelle-bottom table=${this.table}></volvelle-bottom>
            </section>
        `
    }
}

customElements.define("volvelle-sheet", VolvelleSheet)
