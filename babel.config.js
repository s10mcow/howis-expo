module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@types": "./types/index.ts",
            "@data": "./data/index.ts",
          },
          extensions: [".ts", ".tsx"],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
