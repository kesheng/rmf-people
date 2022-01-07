const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ks",
    projectName: "people",
    webpackConfigEnv,
    argv,
  });

  const mergedConfig = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      alias: {
        "@@": [path.resolve(__dirname, "src")],
      },
    },
  });

  return mergedConfig;
};
