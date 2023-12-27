'use strict'

export const RegExpFreezer: Freezer<RegExp, { pattern: string, flags: string }> = {
  freeze(exp) {
    return {
      pattern: exp.source
    , flags: exp.flags
    }
  }
, unfreeze({ pattern, flags }) {
    return new RegExp(pattern, flags)
  }
}
