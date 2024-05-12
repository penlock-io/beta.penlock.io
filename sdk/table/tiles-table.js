class TilesTable extends El {
    render(html) {
        const borders = this.borders ? "borders" : ""
        const cells = this.cells(html)
        return html`<div class="grid ${borders}">${cells}</div>`
    }

    cells(html) {
        const { tiles, tilesHints } = globalThis.codex
        const cells1 = tiles.map((symbol) => {
            const hint = tilesHints.includes(symbol) ? "hint" : ""
            return html`<div class="tile ${hint}">${symbol}</div>`
        })
        const cells2 = cells1.slice().reverse()
        console.log(cells1, cells2)
        return cells1.concat(cells2)
    }

    styles(css) {
        return css`
            .grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                direction: rtl;

                font-family: var(--monospace);
                font-size: 2.6em;

                border: 1px solid transparent;
            }

            .tile {
                display: flex;
                align-items: center;
                justify-content: center;
                aspect-ratio: 1/1;

                border: 1px solid transparent;
            }

            .tile:nth-child(n + 33) {
                transform: rotate(180deg);
            }

            .hint {
                text-decoration: underline 0.05em;
                text-underline-offset: 0.1em;
            }

            .borders.grid {
                direction: ltr;
                border: 1px solid black;
            }

            .borders .tile {
                border: 1px solid black;
            }
        `
    }
}

customElements.define("tiles-table", TilesTable)
