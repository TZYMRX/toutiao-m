import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vant-Ui
import Vant from 'vant'
import 'vant/lib/index.css'

// 全局样式
import './styles/index.less'

// 自动设置 rem 基准值 (HTML 标签字体大小 )
import 'amfe-flexible'

Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
