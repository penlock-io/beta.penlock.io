export class PenlockCommunity extends El {
    render(html) {
        return html`
            <header>
                <h2>We love hearing from you</h2>
                <span>
                    Help us to build a supportive community! Feedback,
                    contributions, and questions are always welcome. :)
                </span>
            </header>
            <nav class="buttons">
                <a
                    href="https://matrix.to/#/#penlock:matrix.org"
                    target="_blank"
                    class="button"
                >
                    <img src="./icons/chat.svg" />
                    Chat on Matrix
                </a>

                <a
                    href="https://github.com/penlock-io/beta.penlock.io"
                    target="_blank"
                    class="button"
                >
                    <img src="./icons/github.svg" />
                    Contribute on Github
                </a>
            </nav>
        `
    }

    styles(css) {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--gap-m);
            }

            header {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--gap-xs);
            }
        `
    }
}

customElements.define("penlock-community", PenlockCommunity)
