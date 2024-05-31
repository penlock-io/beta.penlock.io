export class GridlessTable extends El {
    render(html) {
        return html`
            <table>
                <thead>
                    <th></th>
                    ${this.header(html)}
                </thead>

                <tbody>
                    ${this.rows(html)}
                </tbody>
            </table>
        `
    }

    header(html) {
        return this.table.xs.map((char) => html`<th>${char}</th>`)
    }

    rows(html) {
        return this.table.ys.map((char, i) => {
            const content = this.cells(html, this.table.matrix[i])
            return html`<tr>
                <th>${char}</th>
                ${content}
            </tr>`
        })
    }

    cells(html, values) {
        return values.map((result) => {
            return html`<td>${result}</td>`
        })
    }

    mounted() {
        // Sizing
        this.style.fontSize = `${this.scale ?? 100}%`
    }

    styles(css) {
        return css`
            table {
                font-family: var(--monospace);
                border-spacing: 0.5em;
            }

            td,
            th {
                text-align: center;
                letter-spacing: -0.05em;
            }

            tbody th {
                text-align: left;
            }
        `
    }
}

customElements.define("gridless-table", GridlessTable)
