module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'space-before-blocks': 'off',
    'prefer-const': 'off',
    'no-trailing-spaces': 'off',
    'quote-props': 'off',
    'comma-dangle': 'off',
    'no-undef': 'off',
    'quotes': 'off',
    'semi': 'off',
    // 'comma-dangle': 'off'
  }
}
