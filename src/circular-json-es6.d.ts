declare module 'circular-json-es6' {
  export function stringify(data: any, replacer?: (key: string, value: any) => any, space?: number|string): string
  export function parse(text: string, reviver?: (key: any, value: any) => any): any
  export function stringifyStrict(data: any, replacer?: (key: string, value: any) => any, space?: number|string): string
}