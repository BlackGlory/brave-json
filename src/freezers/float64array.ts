'use strict'

export const Float64ArrayFreezer: Freezer<Float64Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Float64Array(arr)
  }
}
