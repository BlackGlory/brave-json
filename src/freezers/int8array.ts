'use strict'

export const Int8ArrayFreezer: Freezer<Int8Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Int8Array(arr)
  }
}
