# brave-json
## Install
```sh
npm install --save brave-json
# or
yarn add brave-json
```

## API
### BraveJSON
```ts
interface IConverter<Raw, JSON extends JSONValue = JSONValue> {
  toJSON(value: Raw): JSON
  fromJSON(value: JSON): Raw
}

class BraveJSON {
  static readonly DEFAULT_SYMBOL = '$brave-json'

  constructor(
    converter: IConverter<unknown, JSONValue>
  , options?: { symbol?: string = BraveJSON.DEFAULT_SYMBOL }
  )

  stringify(value: unknown, space?: string | number): string
  parse<T>(text: string): T
}
```
