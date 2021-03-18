const path = require("path");
const poststylus = require("poststylus");
const pxtorem = require("postcss-pxtorem");

const resolve = (file) => path.resolve(__dirname, file);
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 2,
            }),
            "autoprefixer",
          ]),
        ],
        import: [resolve("./src/styles/theme.custom")],
      },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2,
          }),
          require("autoprefixer")(),
        ],
      },
      less: {
        // `globalvars` 定义全局对象，可加入全局变量
        globalvars: {
          primary: "#333",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("widgets", resolve("src/widgets"))
      .set("store", resolve("store"))
      .set("public", resolve("public"))
  },
  devServer: {
    open: process.platform === "darwin",
    // host: "localhost",
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: (app) => {},
  },
  transpileDependencies: ["mand-mobile"],
};
