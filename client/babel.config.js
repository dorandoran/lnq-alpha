module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'graphql-tag',
      'import-graphql',
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@screens': './src/screens',
            '@services': './services',
            '@context': './src/context',
            '@auth': './src/components/auth',
            '@common': './src/components/common',
            '@graphql': './src/graphql'
          }
        }
      ]
    ]
  }
}
