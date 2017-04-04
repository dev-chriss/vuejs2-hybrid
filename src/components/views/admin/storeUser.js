import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  selectedUser: {
    name: '',
    email: '',
    role: 'user',
    active: 0,
    birthdate: ''
  }
}

export default new Vuex.Store({
  state
})
