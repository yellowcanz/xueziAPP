module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://101.96.128.94:9999",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
