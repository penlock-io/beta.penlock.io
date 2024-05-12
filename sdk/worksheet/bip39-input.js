import "./svg/user-input.js"

export class Bip39Input extends El {
    render(html) {
        return html`
            <ol>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
                <li><user-input length="8" greyed="0,4"></user-input></li>
            </ol>
        `
    }

    styles(css) {
        return css`
            ol {
                margin: 0;
                padding: 0.2em 0 0 1.6em;
            }

            li {
                padding: 0.2em;
            }
        `
    }
}

customElements.define("bip39-input", Bip39Input)
