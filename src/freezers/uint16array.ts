'use strict'

export const Uint16ArrayFreezer: Freezer<Uint16Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Uint16Array(arr)
  }
}
