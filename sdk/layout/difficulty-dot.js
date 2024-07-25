export class DifficultyDot extends El {
    render(html) {
        this.color ??= "black"
        const fill = this.empty == null ? this.color : "transparent"

        console.log("empty", this.empty != null)
        console.log({ fill })

        return html`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.15em"
                height="1.15em"
                viewBox="0 0 16 16"
            >
                <circle
                    cx="8"
                    cy="8"
                    r="7"
                    fill="${fill}"
                    stroke="${this.color}"
                    stroke-width="1"
                />
            </svg>
        `
    }
}

customElements.define("difficulty-dot", DifficultyDot)
