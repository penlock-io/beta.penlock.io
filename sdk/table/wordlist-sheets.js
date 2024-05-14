export class WordlistSheets extends El {
    render() {
        const chunks = codex.wordlist.cut(512)
        const sheets = chunks.map((chunk) => this.sheet(chunk))
        return sheets.join("\n")
    }

    sheet(chunk) {
        const content = this.content(chunk).join("")
        return `
            <section class="sheet landscape">
                <ul>
                    ${content}
                </ul>
            </section>
        `
    }

    content(wordlist) {
        const items = wordlist.iterate((word, binary, index) => {
            word = this.fancyWord(word)
            binary = this.fancyBinary(binary, index)
            return `<li>${binary} ${word}</li>`
        })
        return items
    }

    fancyWord(word) {
        const head = word.slice(0, 4)
        const tail = word.slice(4)
        return `<span class="greyed">${head}</span>${tail}`
    }

    fancyBinary(binary, index) {
        const head = binary.slice(0, 4)
        const tail = binary.slice(7)

        let middle = binary.slice(4, 7)
        middle = `<span class="greyed">${middle}</span>`

        if (index % 128 == 0) {
            return `<strong>${head}${middle}${tail}</strong>`
        } else if (index % 16 == 0) {
            return `${head}<strong>${middle}${tail}</strong>`
        } else {
            return `${head}${middle}${tail}`
        }
    }

    styles(css) {
        return css`
            ul {
                font-family: var(--monospace);

                list-style: none;
                margin: 0;
                padding-left: 0;

                font-size: 62.8%;
                column-count: 8;
                column-gap: 0.6em;
            }

            li {
                overflow: hidden;
                padding: 0 0.2em !important;
                margin: 0 !important;

                text-transform: uppercase;
            }

            li:nth-child(16n) {
                border-bottom: solid 1px black;
            }

            .greyed {
                background: #ddd;
            }
        `
    }
}

customElements.define("wordlist-sheets", WordlistSheets)
