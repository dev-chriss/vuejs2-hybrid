import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {path: '/', component: load('views/pages/blankpage'), meta: {name: 'Home', needAuth: true}},
    {path: '/blank', component: load('views/pages/blankpage'), meta: {name: 'Blank Page', needAuth: true}},
    {path: '/post', component: load('views/pages/post'), meta: {name: 'Post', needAuth: true}},
    {path: '/login', component: load('views/auth/login'), meta: {name: 'Login', needAuth: false}},
    {path: '/register', component: load('views/auth/register'), meta: {name: 'Register', needAuth: false}},
    {path: '/changepassword', component: load('views/auth/changepassword'), meta: {name: 'Change Password', needAuth: true}},
    {path: '/updateprofile', component: load('views/auth/updateprofile'), meta: {name: 'Update Profile', needAuth: true}},
    {path: '/user', component: load('views/admin/User'), meta: {name: 'User', needAuth: true}},
    {path: '/userEdit', component: load('views/admin/UserEdit'), meta: {name: 'User Edit', needAuth: true}},
    {path: '/userAdd', component: load('views/admin/UserAdd'), meta: {name: 'User Add', needAuth: true}},
    { path: '*', component: load('Error404') } // Not found
  ]
})
