import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  layoutNeeded: true,
  isLoginPage: false,
  mobileMode: false,
  authUser: ''
}

let mutations = {
  setLayoutNeeded (state, value) {
    state.layoutNeeded = value
  },
  setIsLoginPage (state, value) {
    state.isLoginPage = value
  },
  setMobileMode (state, value) {
    state.mobileMode = value
  },
  setAuthUser (user) {
    // console.log(name)
    state.authUser = user
  },
  logout () {
    state.authUser = null
    state.isLoginPage = true
    state.layoutNeeded = false
  }
}

let getters = {
  getLayoutNeeded () {
    return state.layoutNeeded
  },
  getIsLoginPage () {
    return state.isLoginPage
  },
  getMobileMode () {
    return state.mobileMode
  },
  getAuthUser () {
    return state.authUser
  },
  getAuthUserRole () {
    if (state.authUser) {
      return state.authUser.role
    }
    else {
      return ''
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
