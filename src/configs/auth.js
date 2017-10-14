import store from 'configs/store'
export default function (Vue) {
  Vue.auth = {
    setToken (token, expiration) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },

    setUserAuth (user) {
      localStorage.setItem('user', user)
    },

    getToken () {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if (!token || !expiration) {
        return null
      }
      if (Date.now() > Date.parse(expiration)) {
        this.logout()
        return null
      }
      return token
    },

    getUserAuth () {
      var user = localStorage.getItem('user')

      if (!user) {
        return null
      }
      else return user
    },

    getUserAuthId () {
      var user = localStorage.getItem('user')
      if (!user) {
        return null
      }
      else {
        user = JSON.parse(user)
        user = user.id
      }

      return user
    },

    getUserAuthName () {
      var user = localStorage.getItem('user')
      if (!user) {
        return null
      }
      else {
        user = JSON.parse(user)
        user = user.name
      }

      return user
    },

    getUserAuthRole () {
      var user = localStorage.getItem('user')
      if (!user) {
        return ''
      }
      else {
        user = JSON.parse(user)
        user = user.role
      }

      return user
    },

    getUserBirthDate () {
      var user = localStorage.getItem('user')
      if (!user) {
        return null
      }
      else {
        user = JSON.parse(user)
        user = user.birthdate
      }

      return user
    },

    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('expiration')
      localStorage.removeItem('user')

      store.state.layoutNeeded = false
      store.state.isLoginPage = true
      store.state.authUser = null
    },

    isAuthenticated () {
      if (this.getToken()) {
        return true
      }
      else {
        return false
      }
    }
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return Vue.auth
      }
    }
  })
}
