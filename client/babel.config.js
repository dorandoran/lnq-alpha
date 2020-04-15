// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(false)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'graphql-tag',
      'import-graphql',
      '@babel/plugin-proposal-optional-chaining',
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx'],
          alias: {
            '@src': './src',
            '@screens': './src/screens',
            '@context': './src/context',
            '@components': './src/components',
            '@common': './src/components/common',
            '@util': './src/components/util',
            '@services': './services',
            '@graphql': './src/graphql',
            '@config': './config',
            '@hooks': './src/hooks'
          }
        }
      ]
    ]
  }
}
