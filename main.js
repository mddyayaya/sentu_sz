import Vue from 'vue'
import App from './App'
// import pageAnimation from '@/components/page-animation'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	// mixins: [pageAnimation],
    ...App
})
app.$mount()
