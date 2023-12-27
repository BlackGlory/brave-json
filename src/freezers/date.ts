'use strict'

export const DateFreezer: Freezer<Date, number> = {
  freeze(date) {
    return date.getTime()
  }
, unfreeze(time) {
    return new Date(time)
  }
}
