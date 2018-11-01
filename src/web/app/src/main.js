import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueScrollTo from 'vue-scrollto'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.use(ElementUI);
Vue.use(VueScrollTo);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
