'use strict'

export const Uint8ArrayFreezer: Freezer<Uint8Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Uint8Array(arr)
  }
}
