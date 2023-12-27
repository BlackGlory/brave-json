'use strict'

export const Int16ArrayFreezer: Freezer<Int16Array, number[]> = {
  freeze(arr) {
    return [...arr]
  }
, unfreeze(arr) {
    return new Int16Array(arr)
  }
}
