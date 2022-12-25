module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // 'object-shorthand': ['error', 'newer',],
    'react/prop-types': 0,
    'space-infix-ops': 0,
    indent: ['error', 2],
    'space-before-function-paren': ['error', 'never'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }]
  }
}
