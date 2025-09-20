export class UpgradeBanner extends El {
    render(html) {
        return html`
            <a href="https://v1.penlock.io">V1 now live, check it out!</a>
        `
    }

    styles(css) {
        return css`
            :host {
                padding: 0.6em;
                background: tomato;
                font-size: 1.6em;
                text-align: center;
                top: 0;
            }
        `
    }
}

customElements.define("upgrade-banner", UpgradeBanner)
