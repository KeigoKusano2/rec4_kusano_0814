import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/Users'
import chat from './modules/Chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    chat,
  }
});