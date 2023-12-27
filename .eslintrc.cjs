module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  ]
, rules: {
    'no-useless-escape': 'off'
  , '@typescript-eslint/no-explicit-any': 'off'
  , '@typescript-eslint/ban-ts-comment': 'off'
  , '@typescript-eslint/ban-types': 'off'
  }
}
