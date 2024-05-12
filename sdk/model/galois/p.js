export class GaloisField {
    constructor({ prime, degree }) {
        this.prime = prime
        this.degree = degree
        this.size = prime ** degree
    }

    /* Lagrange */
    // FIXME: move generic utils to a shared class?

    // Lagrange polynomial basis
    basis(derived, translated, ...others) {
        return others.reduce((product, other) => {
            const numerator = this.sub(derived, other)
            const denominator = this.sub(translated, other)
            return this.mul(product, this.div(numerator, denominator))
        }, 1)
    }

    /* Field Operations */

    add(a, b) {
        return (a + b) % this.prime
    }

    sub(a, b) {
        return this.add(a, this.minus(b))
    }

    minus(a) {
        return this.opposites[a]
    }

    mul(a, b) {
        return (a * b) % this.prime
    }

    pow(a, b) {
        if (b == 0) return 1
        if (b == 1) return a

        let result = a
        while (b > 1) {
            result = this.mul(result, a)
            b--
        }
        return result
    }

    div(a, b) {
        return this.mul(a, this.inv(b))
    }

    // log(a) {
    //     if (a == 0) throw Error("Invalid operation: logarithm of 0")
    //     return this.logarithms[a]
    // }
    //
    // exp(a) {
    //     return this.exponentials[a]
    // }

    inv(a) {
        if (a == 0) throw Error("Invalid operation: division by 0")
        return this.reciprocals[a]
    }

    /* Tables, delayed evaluation */

    get opposites() {
        const opposites = new Array(this.size)
        for (let i = 0; i < this.size; i++) {
            opposites[i] = (this.prime - i) % this.prime
        }
        return this.$memoize("opposites", opposites)
    }

    get reciprocals() {
        const reciprocals = new Array(this.size)

        for (let i = 1; i < this.size; i++) {
            for (let j = 1; j < this.size; j++) {
                if (this.mul(i, j) == 1) {
                    reciprocals[i] = j
                }
            }
        }

        return this.$memoize("reciprocals", reciprocals)
    }

    // get exponentials() {
    //     const exponentials = new Array(this.size)
    //
    //     let x = 1
    //     for (let i = 0; i < this.size; i++) {
    //         exponentials[i] = x
    //         x = x * this.prime
    //         while (x >= this.size) {
    //             x -= this.primitive
    //             // console.log("x", x)
    //             // x = this.sub(x - this.size, this.primitive)
    //         }
    //     }
    //
    //     return this.$memoize("exponentials", exponentials)
    // }
    //
    // get logarithms() {
    //     const logarithms = new Array(this.size)
    //
    //     for (let i = 0; i < this.size - 1; i++) {
    //         logarithms[this.exponentials[i]] = i
    //     }
    //
    //     return this.$memoize("logarithms", logarithms)
    // }
    //
    // get reciprocals() {
    //     const reciprocals = new Array(this.size)
    //
    //     for (let i = 1; i < this.size; i++) {
    //         reciprocals[i] = this.exp(this.size - 1 - this.log(i))
    //     }
    //
    //     return this.$memoize("reciprocals", reciprocals)
    // }
    //
    // get shifts() {
    //     const shifts = new Array(this.size - 1)
    //
    //     this.exponentials.forEach((x, i) => {
    //         const position = (i * 3) % (this.size - 1)
    //         shifts[position] = x
    //     })
    //
    //     return this.$memoize("shifts", shifts)
    // }

    /* Special */

    $memoize(key, value) {
        Object.defineProperty(this, key, { value })
        return value
    }
}
