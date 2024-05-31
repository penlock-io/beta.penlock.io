export class PenlockLogo extends El {
    render(html) {
        return html`<a href="${location.origin}"> penl<strong>o</strong>ck </a>`
    }

    styles(css) {
        return css`
            :host {
                display: inline-block;
                font-family: var(--monospace);
                font-weight: 600 !important;
                letter-spacing: -0.04em;
            }

            a {
                text-decoration: none;
            }

            strong {
                color: var(--highlight1);
                font-weight: 600;
            }
        `
    }
}

customElements.define("penlock-logo", PenlockLogo)
