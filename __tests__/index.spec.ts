import { describe, test, expect } from 'vitest'
import { BraveJSON, IConverter } from '@src/index.js'

describe('BraveJSON', () => {
  const converter: IConverter<Buffer, [type: string, value: string]> = {
    toJSON(raw) {
      if (raw instanceof Buffer) {
        return ['buffer', raw.toString()]
      }

      throw new Error('Unknown raw value')
    }
  , fromJSON([type, value]) {
      switch (type) {
        case 'buffer': return Buffer.from(value)
        default: throw new Error('Unknown json value')
      }
    }
  }

  test('stringify', () => {
    const brave = new BraveJSON(converter)
    const raw = Buffer.from('foo')

    const result = brave.stringify(raw)

    expect(result).toStrictEqual(
      JSON.stringify([BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']])
    )
  })

  test('parse', () => {
    const brave = new BraveJSON(converter)
    const json = JSON.stringify([BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']])

    const result = brave.parse<Buffer>(json)

    expect(result).toStrictEqual(Buffer.from('foo'))
  })

  describe('raw in object', () => {
    test('stringify', () => {
      const brave = new BraveJSON(converter)
      const raw = { key: Buffer.from('foo') }

      const result = brave.stringify(raw)

      expect(result).toStrictEqual(
        JSON.stringify({ key: [BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']] })
      )
    })

    test('parse', () => {
      const brave = new BraveJSON(converter)
      const json = JSON.stringify({
        key: [BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']]
      })

      const result = brave.parse<Buffer>(json)

      expect(result).toStrictEqual({ key: Buffer.from('foo') })
    })
  })

  describe('raw in array', () => {
    test('stringify', () => {
      const brave = new BraveJSON(converter)
      const raw = [Buffer.from('foo')]

      const result = brave.stringify(raw)

      expect(result).toStrictEqual(
        JSON.stringify([[BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']]])
      )
    })

    test('parse', () => {
      const brave = new BraveJSON(converter)
      const json = JSON.stringify([[BraveJSON.DEFAULT_SYMBOL, ['buffer', 'foo']]])

      const result = brave.parse<Buffer>(json)

      expect(result).toStrictEqual([Buffer.from('foo')])
    })
  })
})
