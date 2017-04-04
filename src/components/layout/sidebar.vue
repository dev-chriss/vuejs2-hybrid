<template>
  <q-drawer ref="leftDrawer" v-show="getLayoutNeeded">
    <div id="profile">
      <img src="./img/avatar-1.svg" id="avatar" class="inline-block" >
      <div id="user-name">
        <span class="text-white">{{ (this.$store.state.authUser  ? this.$store.state.authUser.name : 'undefined' ) }}</span>
      </div>
      <div id="user-actions" style="margin-top:3px;">
        <button class="bordered blue small" @click="updateprofile()"><i>person</i><q-tooltip>Profile</q-tooltip></button>
        <button class="bordered blue small" @click="changepassword()"><i>lock</i><q-tooltip>Change Password</q-tooltip></button>
        <button class="bordered blue small" @click="logout()"><i>exit_to_app</i><q-tooltip>Log Out</q-tooltip></button>
      </div>
    </div>

    <div class="list no-border platform-delimiter light-paragraph">

      <div class="list-label" v-show="this.getAuthUserRole()=='superadmin' || this.getAuthUserRole()=='admin'">Admin</div>
      <q-drawer-link v-show="this.getAuthUserRole()=='superadmin' || this.getAuthUserRole()=='admin'" icon="account_box" :to="{path: '/user', exact: true}">
        User
      </q-drawer-link>

      <div class="list-label ">Pages</div>
      <q-drawer-link icon="speaker_notes" :to="{path: '/post', exact: true}">
        Post
      </q-drawer-link>
      <q-drawer-link icon="note" :to="{path: '/blank', exact: true}">
        Blank Page
      </q-drawer-link>
    </div>

  </q-drawer>
</template>
<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  import { Dialog } from 'quasar'
  export default {
    name: 'sidebar',
    computed: {
      ...mapGetters(['getLayoutNeeded'])
    },
    methods: {
      ...mapMutations(['setMobileMode']),
      ...mapMutations(['setLayoutNeeded']),
      getAuthUserRole () {
        return (this.$store.state.authUser ? this.$store.state.authUser.role : 'user')
      },
      changepassword () {
        this.$router.push('/changepassword')
        this.$refs.leftDrawer.close()
      },
      updateprofile () {
        this.$router.push('/updateprofile')
        this.$refs.leftDrawer.close()
      },
      logout () {
        var axios = this.$http
        var auth = this.$auth
        var router = this.$router
        var drawer = this.$refs.leftDrawer

        Dialog.create({
          title: 'Confirm',
          message: 'Are you sure want to quit ? ',
          buttons: [
            {
              label: 'Yes',
              handler () {
                axios.delete('logout')
                .then(response => {
                  auth.logout()
                  drawer.close()
                  router.push('/login')
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response)
                  }
                  else {
                    console.log(error.message)
                  }
                })
              }
            },
            {
              label: 'No'
            }
          ]
        })
      }
    }
  }
</script>
<style scoped>
  .fixed-bottom {
    margin-bottom: 1%;
  }
  .list-label:first-child{
    line-height: 50px;
  }
  .router-link-active {
    color: #027be3;
    background-color: #dadada !important;
    border-right: 2px solid #027be3;
  }
  .router-link-active .item-primary{
    color: #027be3;
  }
  .fixed-bottom a img {
    width: 25px;
    height: 25px;
  }
  #avatar{
    padding: 20px;
  }
  #profile {
    padding-top:10px;
    height: 130px;
    background-color: #009688;
  }
  #user-name {
    left: 90px;
    bottom: 77px;
    position: relative;
    width: 159px;
  }
  #user-actions {
    left: 90px;
    bottom: 71px;
    position: relative;
    width: 171px;
  }
</style>
