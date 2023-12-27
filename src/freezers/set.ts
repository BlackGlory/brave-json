'use strict'

export const SetFreezer: Freezer<Set<any>, any[]> = {
  freeze(set) {
    return [...set]
  }
, unfreeze(arr: any[]) {
    return new Set(arr)
  }
}
