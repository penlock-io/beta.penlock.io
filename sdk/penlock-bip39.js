import { penlock } from "./data/penlock-bip39.js"
import { Codex } from "./model/codex.js"

const codex = new Codex(penlock)
globalThis.codex = codex
console.log("Codex:", globalThis.codex)
