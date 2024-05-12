export class Table {
    constructor({ charset, name, operation, xs = charset, ys = charset }) {
        this.name = name
        this.operation = operation
        this.charset = charset
        this.xs = Array.from(xs.keys())
        this.ys = Array.from(ys.keys())

        this.image = `assets/${name}.svg`

        this.matrix = Array.from(ys.values(), (y) => {
            return Array.from(xs.values(), (x) => {
                const result = this.operation(x, y)
                return this.charset.encode(result)
            })
        })
    }
}
