'use strict'

function shallowCopy(obj: any): any {
  const copy: any = {}
  for (const name of Object.getOwnPropertyNames(obj)) {
    copy[name] = obj[name]
  }
  if (obj.name) {
    copy.name = obj.name
  }
  return copy
}

/* istanbul ignore next */
const self: any = (function(this: any) {
  if (typeof global !== 'undefined') {
    return global
  } else if (typeof window !== 'undefined') {
    return window
  } else if (typeof self !== 'undefined') {
    return self
  }
  return this
})()

export const ErrorFreezer: Freezer<Error, any> = {
  freeze(err) {
    return shallowCopy(err)
  }
, unfreeze(obj) {
    const errConstructor = self[obj.name] || Error
    return Object.assign(new errConstructor(), obj)
  }
}
