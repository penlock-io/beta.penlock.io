import "./share-input.js"

export class ShareSection extends El {
    render(html) {
        console.log(html`${this.aside}`)
        this.prompt ??= this.scheme ? "Group:" : undefined
        this.footer ??= location.hostname

        return html`
            <section class="row">
                <header>
                    <div>
                        <h4>${this.header}</h4>
                        <aside>${this.scheme}</aside>
                    </div>
                    <section>${this.prompt}</section>
                    <footer>${this.footer}</footer>
                </header>
                <share-input words=${this.words}></share-input>
            </section>
        `
    }

    styles(css) {
        return css`
            :host > section {
                padding: 0.4em;
                border: 1px dashed black;
                border-radius: 0.35em;
            }

            header {
                width: 40%;
                min-width: 15%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                padding: 0.4em;
                gap: 0.4em;
            }

            header div {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            header section {
                height: 100%;
            }

            footer {
                font-style: italic;
                font-size: 90%;
            }
        `
    }
}
customElements.define("share-section", ShareSection)
