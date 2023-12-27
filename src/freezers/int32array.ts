'use strict'

export const Int32ArrayFreezer: Freezer<Int32Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Int32Array(arr)
  }
}
