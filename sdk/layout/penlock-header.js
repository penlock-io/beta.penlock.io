import "./penlock-logo.js"

export class PenlockHeader extends El {
    render(html) {
        return html`
            <penlock-logo href="${location.hostname}"></penlock-logo>
            <header class="column">
                <span class="subtitle">${this.subtitle}</span>
                <h2>${this.title}</h2>
            </header>
            <hr />
        `
    }

    styles(css) {
        return css`
            :host {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                gap: var(--gap-m);

                font-size: min(min(1rem, 3vw), 2vh);
            }

            penlock-logo {
                padding: 6vh 0 0 8vw;
                align-self: start;
                font-size: 2.25em;
            }

            .subtitle {
                font-size: 1.5em;
            }

            h2 {
                font-family: var(--monospace);
                font-size: 4em;
                font-weight: 400;
                color: var(--orange-600);
            }

            hr {
                margin: 0;
                width: var(--paper-width);
                border-top: 1px solid var(--gray);
            }
        `
    }
}

customElements.define("penlock-header", PenlockHeader)
