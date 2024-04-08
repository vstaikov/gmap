module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ios.tsx", ".android.tsx", ".ts", ".tsx", ".json"],
        alias: {
          "@common": "./src/common",
          "@features": "./src/features",
          "@utils": "./src/utils",
          "@mocks": "./src/__mocks__",
        },
      },
    ],
  ],
};
