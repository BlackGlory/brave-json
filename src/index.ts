import { JSONValue, isArray, isBoolean, isNumber, isntNaN, isFinite, go, isString, isPlainObject, isNull } from '@blackglory/prelude'

type IConvertedValue = [symbol: string, value: JSONValue]

export interface IConverter<Raw, JSON extends JSONValue = JSONValue> {
  toJSON(value: Raw): JSON
  fromJSON(value: JSON): Raw
}

export class BraveJSON {
  static readonly DEFAULT_SYMBOL = '$brave-json'

  private symbol: string

  constructor(
    private converter: IConverter<unknown, JSONValue>
  , { symbol = BraveJSON.DEFAULT_SYMBOL }: { symbol?: string } = {}
  ) {
    this.symbol = symbol
  }

  stringify(value: unknown, space?: string | number): string {
    return JSON.stringify(value, this.replacer, space)
  }

  parse<T>(text: string): T {
    return JSON.parse(text, this.reviver)
  }

  private replacer = go(() => {
    const self = this

    return function (
      this: Record<string | number | symbol, unknown>
    , key: string
    , value: unknown
    ): unknown {
      // The argument `value` may be not the raw (It have called `toJSON` method)
      const rawValue = this[key]

      if (
        isArray(rawValue) ||
        isBoolean(rawValue) ||
        isString(rawValue) ||
        isNull(rawValue) ||
        (isNumber(rawValue) && isntNaN(rawValue) && isFinite(rawValue)) ||
        isPlainObject(rawValue)
      ) {
        return value
      } else {
        return [self.symbol, self.converter.toJSON(rawValue)]
      }
    }
  })

  private reviver = (key: string, value: unknown): unknown => {
    if (this.isTransformedNonJSONValue(value)) {
      const [, json] = value
      return this.converter.fromJSON(json)
    } else {
      return value
    }
  }

  private isTransformedNonJSONValue(val: unknown): val is IConvertedValue {
    return isArray(val)
        && val.length === 2
        && val[0] === this.symbol
  }
}
