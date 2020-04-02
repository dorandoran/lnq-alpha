module.exports = function(api) {
  api.cache(true)

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
            '@common': './src/components/common',
            '@components': './src/components',
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
