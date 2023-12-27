'use strict'

import getType from 'type-detect'
import { stringify, parse } from '@src/index.js'

describe('stringify & parse', () => {
  test('Circular structure', () => {
    const a = {}
    // @ts-ignore
    a.a = a
    const result = parse(stringify(a))

    expect(result.a).toEqual(result)
  })

  test('Date', () => {
    const date = new Date()
    const result = parse(stringify(date))

    expect(getType(result)).toEqual('Date')
    expect(result).toEqual(date)
  })

  test('String', () => {
    const str = new String('str')
    const result = parse(stringify(str))

    expect(getType(result)).toEqual('String')
    expect(result.toString()).toEqual('str')
  })

  test('Set', () => {
    const set = new Set([1, 2, 3])
    const result = parse(stringify(set))

    expect(getType(result)).toEqual('Set')
    expect(result).toEqual(set)
  })

  test('Map', () => {
    const map = new Map([[1, 2]])
    const result = parse(stringify(map))

    expect(getType(result)).toEqual('Map')
    expect(result).toEqual(map)
  })

  describe('function', () => {
    test('function', () => {
      function fn() {
        return 'Hi Lisa'
      }
      const result = parse(stringify(fn))

      expect(getType(result)).toEqual('function')
      expect(result()).toEqual('Hi Lisa')
    })

    test('function with options', () => {
      function fn() {
        return `Hi ${ name }`
      }

      const result = parse(stringify(fn), undefined, {
        FunctionContext: {
          name: 'Lisa'
        }
      })

      expect(getType(result)).toEqual('function')
      expect(result()).toEqual('Hi Lisa')
    })
  })

  describe('RegExp', () => {
    test('RegExp literal', () => {
      const re = /\w/g
      const result = parse(stringify(re))

      expect(getType(result)).toEqual('RegExp')
      expect(result).toEqual(re)
    })

    test('RegExp', () => {
      const re = new RegExp('\w', 'g')
      const result = parse(stringify(re))

      expect(getType(result)).toEqual('RegExp')
      expect(result).toEqual(re)
    })
  })

  describe('number', () => {
    test('number', () => {
      const num = 10
      const result = parse(stringify(num))

      expect(getType(result)).toEqual('number')
      expect(result).toEqual(num)
    })

    test('NaN', () => {
      expect(parse(stringify(NaN))).toEqual(NaN)
    })

    test('Infinity', () => {
      expect(parse(stringify(Infinity))).toEqual(Infinity)
    })
  })

  describe('Number', () => {
    test('Number', () => {
      const num = new Number(10)
      const result = parse(stringify(num))

      expect(getType(result)).toEqual('Number')
      expect(result).toEqual(num)
    })

    test('Number(NaN)', () => {
      const nan = new Number(NaN)
      expect(parse(stringify(nan))).toEqual(nan)
    })

    test('Number(Infinity)', () => {
      const infinity = new Number(Infinity)
      expect(parse(stringify(infinity))).toEqual(infinity)
    })
  })

  describe('TypedArray', () => {
    test('Int8Array', () => {
      const arr = new Int8Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Int8Array')
      expect(result).toEqual(arr)
    })

    test('Uint8Array', () => {
      const arr = new Uint8Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Uint8Array')
      expect(result).toEqual(arr)
    })

    test('Uint8ClampedArray', () => {
      const arr = new Uint8ClampedArray([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Uint8ClampedArray')
      expect(result).toEqual(arr)
    })

    test('Int16Array', () => {
      const arr = new Int16Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Int16Array')
      expect(result).toEqual(arr)
    })

    test('Uint16Array', () => {
      const arr = new Uint16Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Uint16Array')
      expect(result).toEqual(arr)
    })

    test('Int32Array', () => {
      const arr = new Int32Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Int32Array')
      expect(result).toEqual(arr)
    })

    test('Uint32Array', () => {
      const arr = new Uint32Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Uint32Array')
      expect(result).toEqual(arr)
    })

    test('Float32Array', () => {
      const arr = new Float32Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Float32Array')
      expect(result).toEqual(arr)
    })

    test('Float64Array', () => {
      const arr = new Float64Array([1, 2, 3])
      const result = parse(stringify(arr))

      expect(getType(result)).toEqual('Float64Array')
      expect(result).toEqual(arr)
    })
  })

  describe('Error', () => {
    test('Error', () => {
      const err = new Error('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result).toEqual(err)
    })

    test('EvalError', () => {
      const err = new EvalError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof EvalError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('RangeError', () => {
      const err = new RangeError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof RangeError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('ReferenceError', () => {
      const err = new ReferenceError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof ReferenceError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('SyntaxError', () => {
      const err = new SyntaxError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof SyntaxError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('TypeError', () => {
      const err = new TypeError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof TypeError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('URIError', () => {
      const err = new URIError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result instanceof URIError).toBeTruthy()
      expect(result).toEqual(err)
    })

    test('CustomError', () => {
      class CustomError extends Error {
        constructor(...args: string[]) {
          super(...args)
          this.name = 'CustomError'
        }
      }

      const err = new CustomError('err')
      const result = parse(stringify(err))

      expect(getType(result)).toEqual('Error')
      expect(result.name).toEqual('CustomError')
      expect(result).toEqual(err)
    })
  })
})
