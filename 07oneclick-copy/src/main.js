import Vue from 'vue'
import App from './App.vue'
import Directives from './directives'

// use自定义指令
Vue.use(Directives)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
