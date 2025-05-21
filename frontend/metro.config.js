const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  defaultConfig.resolver.sourceExts.push('cjs');
  defaultConfig.resolver.unstable_enablePackageExports = false;
  return defaultConfig;
})();
