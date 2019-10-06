import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import utils from './utils'
import './assets/css/simba.plugin.css'
Vue.use(utils.simbaPlugin, { color: "#558FF2" })
Vue.config.productionTip = false
import store from './store'
import router from './routes'
import mock from './mock'

new Vue({
  store,
  router,
  el: "#app",
  render: h => h(App)
})
