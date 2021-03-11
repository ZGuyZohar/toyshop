import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCharts from 'vue-chartjs'
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps'
import 'element-ui/lib/theme-chalk/index.css';
import "@/styles/styles.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
 load: {
   key: 'AIzaSyDh4V0vPsJ6vUzqAnogu83nmHbm_nK48fA',
   libraries: 'places', 
 },
})

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
