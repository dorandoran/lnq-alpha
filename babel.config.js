module.exports = function(api) {
	api.cache(true)

  return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						"@screens": "./src/screens",
						"@services": "./src/services" 
					}
				}
			]
		]
	}
};
