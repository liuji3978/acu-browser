// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import iView from 'iview';
import VueI18n from 'vue-i18n';


Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueClipboard)
Vue.use(iView)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('./assets/lang/zh.js'),
    'en': require('./assets/lang/en.js')
  }
});


new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
