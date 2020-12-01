module.exports = {
  rules: {
    'unused-classes': require('./rule')
  },
  configs: {
    recommended: {
      plugins: ['mui-unused-classes'],
      rules: {
        'mui-unused-classes/unused-classes': 'warn'
      }
    }
  }
}