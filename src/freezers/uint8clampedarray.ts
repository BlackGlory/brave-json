'use strict'

export const Uint8ClampedArrayFreezer: Freezer<Uint8ClampedArray, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Uint8ClampedArray(arr)
  }
}
