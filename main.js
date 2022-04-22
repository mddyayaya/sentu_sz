import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import 'swiper/swiper.min.css';
import * as echarts from 'echarts'
import uView from "@/uni_modules/uview-ui"

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
App.mpType = 'app'
let config_url = ""
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    config_url = 'http://people.neeip.net/foot/'
}else{
    // 生产环境
    config_url = 'http://people.neeip.net/foot/'
}
Vue.prototype.$config_url = config_url
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif