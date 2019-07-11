module.exports = {
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
}
