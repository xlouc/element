/** @format */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'no-useless-escape': 'off',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 150,
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        htmlWhitespaceSensitivity: 'ignore',
        insertPragma: true,
        requirePragma: false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
