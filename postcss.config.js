module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 转换的根元素基准值
      rootValue: 37.5,
      // 需要转换的css属性, *代表全部
      propList: ['*']
    }
  }
}
