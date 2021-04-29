import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "./plugins/element.js"

import axios from "axios"

// 导入样式清除
import "normalize.css"

import qs from "qs"

// 导入flexible
import "lib-flexible/flexible"

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:5000/"
axios.interceptors.request.use((config) => {
  // 再请求通对象，添加一个token验证的authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  // 在最后必须返回return config
  return config
})

axios.interceptors.response.use((config) => {
  return config
})
Vue.prototype.$http = axios

Vue.prototype.$qs = qs

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
