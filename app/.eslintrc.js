module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [ 'error', 240 ],
  }
}

