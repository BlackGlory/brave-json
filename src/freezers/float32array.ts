'use strict'

export const Float32ArrayFreezer: Freezer<Float32Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Float32Array(arr)
  }
}
