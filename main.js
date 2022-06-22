import Vue from 'vue'
import App from './App'

// 分装请求接口
import '@/utils/http.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// 