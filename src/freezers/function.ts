// non-strict

import { createDynamicScopeExpression } from 'dynamic-scope'

export const FunctionFreezer: Freezer<(...args: any[]) => any, string> = {
  freeze(fn) {
    return createDynamicScopeExpression(fn)
  }
, unfreeze(exp, options) {
    return eval(exp)(options['FunctionContext'])
  }
}
