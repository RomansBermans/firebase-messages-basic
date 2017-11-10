module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [ 'error', 240 ],
  }
}

