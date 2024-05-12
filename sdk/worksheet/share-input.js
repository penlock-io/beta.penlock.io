import "./svg/user-input.js"

export class ShareInput extends El {
    render(html) {
        // TODO: improve abstraction? Have codex do that?
        const url = new URL(location.href)
        const length = url.searchParams.get("words") ?? 12
        const content = Array.from({ length }).map((_, i) => {
            return this.section(html)
        })
        return html`${content}`
    }

    section(html) {
        return html`
            <section class="column">
                <user-input length="4" greyed="0, 4"></user-input>
                <user-input length="4"></user-input>
            </section>
        `
    }

    styles(css) {
        return css`
            :host {
                display: flex;
                flex-wrap: wrap;
            }

            section.column {
                flex-basis: 15%;
                flex-grow: 1;
                align-items: flex-end;
                counter-increment: input;
            }

            user-input[greyed]::before {
                content: counter(input) ". ";
            }

            user-input:not([greyed])::before {
                content: counter(input, lower-alpha) ". ";
            }
        `
    }
}

customElements.define("share-input", ShareInput)
