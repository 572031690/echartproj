module.exports = {
  // 使用Runtime 版本
  runtimeCompiler: true,
  devServer: {
    port: 8999, //  端口号的配置
    open: true // 自动打开浏览器
  },
  // 关闭语法检查
  lintOnSave: false
  // resolve: {
  //   extensions: [".js", ".vue", ".json"],
  //   alias: {
  //     vue$: "vue/dist/vue.esm.js",
  //     "@": resolve("src")
  //   }
  // }
}
