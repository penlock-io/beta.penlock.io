class BinaryTable extends El {
    render(html) {
        const cells = this.cells(html)
        return html`
            <section>
                <ul>
                    ${cells}
                </ul>
            </section>
        `
    }

    cells(html) {
        const { tiles, galois } = globalThis.codex
        const length = Math.log2(tiles.length)
        return tiles.map((symbol, i) => {
            const binary = integerToBinary(i, length)
            return html`<li>${symbol}: ${binary}</li>`
        })
    }

    styles(css) {
        return css`
            :host {
                display: block;
            }

            section {
                font-family: var(--monospace);
                width: 100%
            }

            ul {
                list-style: none;
                column-count: 4;
                padding 0;
            }

            li {
                padding: 0.2em;
                text-align: center;
            }
        `
    }
}

customElements.define("binary-table", BinaryTable)

/* Helpers */

function integerToBinary(n, length) {
    const binary = n.toString(2).padStart(length, "0")
    const nicer = binary.replaceAll("0", "O").replaceAll("1", "X")
    return nicer
}
