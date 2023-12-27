declare type PrimitiveTypes = boolean | null | undefined | number | string | symbol
declare type StructuredPrimitiveTypes = boolean | null | undefined | number | string | symbol
declare type StructuredTypes =
  StructuredPrimitiveTypes
| Boolean
| String
| Date
| RegExp
| Blob
| File
| FileList
| ArrayBuffer
| ArrayBufferView
| ImageData
| Array<any>
| Object
| Map<any, any>
| Set<any>
declare type Options = { [index: string]: any }

declare interface Freezer<Raw, Frozen extends StructuredTypes> {
  freeze(rawValue: Raw, options: Options): Frozen
  unfreeze(frozenValue: Frozen, options: Options): Raw
}