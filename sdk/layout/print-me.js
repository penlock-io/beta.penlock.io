export class PrintMe extends El {
    render(html) {
        return html`
            <nav class="buttons">
                <a class="button highlight2" onclick="print()">
                    <img src="./icons/print.svg" />
                    <span>Print the document</span>
                </a>
                <!-- TODO: implement that one -->
                <!-- <a class="button" hidden> -->
                <!--     <img src="./icons/download.svg" /> -->
                <!--     <span>Download as PDF</span> -->
                <!-- </a> -->
            </nav>
        `
    }
}

customElements.define("print-me", PrintMe)
