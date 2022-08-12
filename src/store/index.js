import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth.module";
/**
 * La libreria de Vuex esta basado en el patron de diseño de comportamimento --- > MEDIADOR < ----------
 */
Vue.use(Vuex)

export default new Vuex.Store({ 
  modules: {
    auth,
  }
})
