import Vue from 'vue'
import Vuex from 'vuex'
import config from "./assets/config.json"
import data from "./assets/data.json"

Vue.use(Vuex)

Vue.prototype.$bundle = data
Vue.prototype.$config = config

export default new Vuex.Store({
  state: {
    
  }
  
})
