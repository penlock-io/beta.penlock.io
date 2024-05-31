import "./svg/user-input.js"

export class BinaryInput extends El {
    render(html) {
        return html`
            <ol>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li><user-input length="11" greyed="4,3"></user-input></li>
                <li>
                    <user-input
                        length="11"
                        greyed="4,3"
                        skip="7,4"
                        value="       ????"
                    ></user-input>
                </li>
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

customElements.define("binary-input", BinaryInput)
