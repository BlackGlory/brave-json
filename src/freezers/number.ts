'use strict'

export const numberFreezer: Freezer<number, string> = {
  freeze(num) {
    if (isNaN(num)) {
      return 'NaN'
    } else if (!isFinite(num)) {
      return 'Infinity'
    } else {
      return num.toString()
    }
  }
, unfreeze(exp) {
    if (exp === 'NaN') {
      return NaN
    } else if (exp === 'Infinity') {
      return Infinity
    } else {
      return Number(exp)
    }
  }
}

export const NumberFreezer: Freezer<Number, string> = {
  freeze(num) {
    const x = Number(num)
    if (isNaN(x)) {
      return 'NaN'
    } else if (!isFinite(x)) {
      return 'Infinity'
    } else {
      return x.toString()
    }
  }
, unfreeze(exp) {
    if (exp === 'NaN') {
      return new Number(NaN)
    } else if (exp === 'Infinity') {
      return new Number(Infinity)
    } else {
      return new Number(exp)
    }
  }
}
