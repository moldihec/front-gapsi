import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ApiService from "./store/services/api.service"
import vuetify from './plugins/vuetify'
import "./plugins/bootstrap-vue";

Vue.config.productionTip = false

// Inicializa el servicio para llamar invocar los metodos de axio para consumir el API Rest
ApiService.init();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
