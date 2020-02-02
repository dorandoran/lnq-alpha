module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@screens': './src/screens',
            '@services': './services',
            '@context': './src/context',
            '@auth': './src/components/auth',
            '@common': './src/components/common'
          }
        }
      ]
    ]
  }
}
