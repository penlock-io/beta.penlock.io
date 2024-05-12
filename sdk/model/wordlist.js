export class Wordlist {
    constructor(words, offset = 0) {
        this.words = words
        this.offset = offset
    }

    cut(length) {
        const chunks = []
        for (let i = 0; i < this.words.length; i += length) {
            const words = this.words.slice(i, i + length)
            const chunk = new Wordlist(words, i)
            chunks.push(chunk)
        }
        return chunks
    }

    iterate(callback) {
        return this.words.map((word, i) => {
            const binary = integerToBinary(this.offset + i, 11)
            return callback(word, binary, i)
        })
    }
}

/* Helpers */

function integerToBinary(n, length) {
    const binary = n.toString(2).padStart(length, "0")
    const nicer = binary.replaceAll("0", "O").replaceAll("1", "X")
    return nicer
}
