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
                margin: 0;
                padding: 0.2em 0 0 1.6em;
            }

            li {
                padding: 0.2em;
            }
        `
    }
}

customElements.define("binary-input", BinaryInput)
