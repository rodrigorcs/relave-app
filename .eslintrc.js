module.exports = {
  env: {
    browser: true,
    'react-native/react-native': true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-native', '@typescript-eslint'],
}
