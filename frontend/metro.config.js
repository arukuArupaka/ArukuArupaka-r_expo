const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    // SVG を使わないならこの行は削除してOK
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // SVG を画像として読み込めるようにする設定（不要なら削除OK）
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'cjs'],
    unstable_enablePackageExports: false,
  },
};

module.exports = mergeConfig(defaultConfig, config);
