'use strict'

export const StringFreezer: Freezer<String, string> = {
  freeze(x) {
    return x.toString()
  }
, unfreeze(exp) {
    return new String(exp)
  }
}
