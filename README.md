# brave-json [![npm](https://img.shields.io/npm/v/brave-json.svg?maxAge=2592000)](https://www.npmjs.com/package/brave-json) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/BlackGlory/brave-json/master/LICENSE) [![Build Status](https://travis-ci.org/BlackGlory/brave-json.svg?branch=master)](https://travis-ci.org/BlackGlory/brave-json) [![Coverage Status](https://coveralls.io/repos/github/BlackGlory/brave-json/badge.svg)](https://coveralls.io/github/BlackGlory/brave-json)

As much as possible to serialize JavaScript object to JSON

## Install

```sh
yarn add brave-json
```

## Usage

```js
import { stringify, parse } from 'brave-json'

const a = {
  sayHelloWorld() {
    console.log('Hello World')
  }
}
a.b = a

parse(stringify(a)).b.sayHelloWorld() // 'Hello World'
```