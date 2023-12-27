'use strict'

export const MapFreezer: Freezer<Map<any, any>, Array<[any, any]>> = {
  freeze(map) {
    return [...map.entries()]
  }
, unfreeze(kv) {
    return new Map(kv)
  }
}
