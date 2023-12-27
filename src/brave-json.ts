'use strict'

import getType = require('type-detect')
import * as CircularJSON from 'circular-json-es6'
import { RegExpFreezer } from './freezers/regexp'
import { DateFreezer } from './freezers/date'
import { NumberFreezer, numberFreezer } from './freezers/number'
import { SetFreezer } from './freezers/set'
import { MapFreezer } from './freezers/map'
import { Int8ArrayFreezer } from './freezers/int8array'
import { Uint8ArrayFreezer } from './freezers/uint8array'
import { Uint8ClampedArrayFreezer } from './freezers/uint8clampedarray'
import { Uint16ArrayFreezer } from './freezers/uint16array'
import { Int32ArrayFreezer } from './freezers/int32array'
import { Uint32ArrayFreezer } from './freezers/uint32array'
import { Float32ArrayFreezer } from './freezers/float32array'
import { Float64ArrayFreezer } from './freezers/float64array'
import { ErrorFreezer } from './freezers/error'
import { FunctionFreezer } from './freezers/function'
import { Int16ArrayFreezer } from './freezers/int16array'
import { StringFreezer } from './freezers/string'

interface Braved {
  type: string
  value: any
}

function braveReplacer<T>(this: any, key: string, value: T, options: Options): Braved | T {
  // Argument "value" may have called toJSON method
  const rawValue = this[key] // Re-acquire the raw value
  const type = getType(rawValue)
  if (Support[type]) {
    return {
      type
    , value: stringify(Support[type].freeze(rawValue, options))
    } as Braved
  }
  return value
}

function braveReviver(this: any, key: string, value: any, options: Options): any {
  if (typeof value === 'object' && 'type' in value && 'value' in value && Support[value.type]) {
    const bravedValue: Braved = value
    return Support[bravedValue.type].unfreeze(parse(bravedValue.value), options)
  }
  return value
}

export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number, options: Options = {}) {
  return CircularJSON.stringify(value, function(this: any, key: string, value: any) {
    return braveReplacer.call(this, key, replacer ? replacer.call(this, key, value) : value, options)
  }, space)
}

export function parse(text: string, reviver?: (k: string, v: any) => any, options: Options = {}) {
  return CircularJSON.parse(text, function(this: any, key: string, value: any) {
    return braveReviver.call(this, key, reviver ? reviver.call(this, key, value) : value, options)
  })
}

const Support: { [index: string]: Freezer<any, any> } = {
  'RegExp': RegExpFreezer
, 'Date': DateFreezer
, 'number': numberFreezer
, 'Number': NumberFreezer
, 'String': StringFreezer
, 'Set': SetFreezer
, 'Map': MapFreezer
, 'Int8Array': Int8ArrayFreezer
, 'Uint8Array': Uint8ArrayFreezer
, 'Uint8ClampedArray': Uint8ClampedArrayFreezer
, 'Int16Array': Int16ArrayFreezer
, 'Uint16Array': Uint16ArrayFreezer
, 'Int32Array': Int32ArrayFreezer
, 'Uint32Array': Uint32ArrayFreezer
, 'Float32Array': Float32ArrayFreezer
, 'Float64Array': Float64ArrayFreezer
, 'Error': ErrorFreezer
, 'function': FunctionFreezer
}
