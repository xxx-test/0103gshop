// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import  router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'
import VueLazyLoad from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'

Vue.component(Button.name, Button)
Vue.use(VueLazyLoad, {
  loading: loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
