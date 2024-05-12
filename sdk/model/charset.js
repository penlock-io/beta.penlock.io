export class Charset extends Map {
    matrix(operation) {
        return [...this.values()].map((x) => {
            return [...this.values()].map((y) => {
                const result = operation(x, y)
                return this.encode(result)
            })
        })
    }

    ingest(values) {
        Array.from(this.entries()).forEach(([char], i) => {
            this.set(char, values[i])
        })
    }

    slice(start, end) {
        const entries = Array.from(this).slice(start, end)
        return new Charset(entries)
    }

    without(value) {
        const map = new Charset(this)
        const char = map.encode(value)
        map.delete(char)
        return map
    }

    encode(result) {
        for (const [char, value] of this) {
            if (value == result) return char
        }
    }

    decode(char) {
        return this.get(char)
    }
}
