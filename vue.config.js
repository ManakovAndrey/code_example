module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "css": require("path").resolve(__dirname, "src/assets/css")
      }
    },
    module: {
      rules: [
        // ... другие правила опущены
  
        // это правило будет применяться к обычным файлам `.scss`
        // А ТАКЖЕ к секциям `<style lang="scss">` в файлах `.vue`
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    getResolver: this.getResolver,
  }
};