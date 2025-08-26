const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = {
	...config,
	resolver: {
		...config.resolver,
		blockList: [config.resolver.blockList, /(\/lib-origin\/roze\/native\/.+?\/.+?\.node\.ts)$/]
	}
};
