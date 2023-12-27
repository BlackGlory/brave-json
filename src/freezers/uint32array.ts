'use strict'

export const Uint32ArrayFreezer: Freezer<Uint32Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Uint32Array(arr)
  }
}
