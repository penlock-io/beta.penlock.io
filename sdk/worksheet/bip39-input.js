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
                display: flex;
                flex-direction: column;
                align-items: end;
                gap: 0.4em;
            }
        `
    }
}

customElements.define("bip39-input", Bip39Input)
