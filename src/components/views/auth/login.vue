<template>
  <div class="flex justify-center full-height " :class="heightSize">

    <div class="card text-white text-center width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto bg-white " id="login">
      <div class="card-title bg-blue-8" >
        <svg id="logo" viewBox="0 0 483 483"
             style="enable-background:new 0 0 460 460;"
             xml:space="preserve" width="128px" height="128px"
             v-html="logoMethod">
        </svg>
        <h5>Login</h5>
      </div>
      <div class="card-content bg-white ">
          <e-input
            type="text"
            label="Email"
            v-model="email"
            :validation="$v.email"
            :validation-messages="validationMessages.email"
            :value="email"
          ></e-input>
          <e-input
            type="password"
            label="Password"
            v-model="password"
            :validation="$v.password"
            :validation-messages="validationMessages.password"
            :value="password"
          ></e-input>
      </div>


      <div class="card-actions vertical-middle">
        <button class="blue bg-blue-8 fit"  @click="login() ">Login</button>
      </div>
      <div class="card-actions inline-block vertical-middle" style="margin-bottom:20px;">
        <a @click="register()" > Doesn't have an account ? Click here to register </a>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import {mapMutations} from 'vuex'
  import Vivus from 'vivus'
  import logoData from './logoData'
  import { Platform, Toast } from 'quasar'
  import { required, minLength, between, email, password } from 'vuelidate/lib/validators'
  import eInput from '../../custom/eInput.vue'

  export default {
    mounted () {
      this.setLayoutNeeded(false)
      this.setIsLoginPage(true)
      this.startAnimation()
    },
    computed: {
      heightSize (){
        /*
        if (Platform.is.desktop) {
          return 'items-center'
        }
        return ''
        */
        return 'items-center'
      },
      logoMethod () {
        return logoData[this.logo]
      }
    },
    data () {
      return {
        logos: Object.keys(logoData),
        logo: 'Molectron',
        email: '',
        password: '',
        validationMessages: {
          email: {
            required: 'Email is required.',
            minLength: 'Minimum 6 characters.',
            email: 'Email is not valid.'
          },
          password: {
            required: 'Password is required.',
            minLength: 'Minimum 3 characters.',
          }
        },
      }
    },
    validations: {
      email: {
        required,
        email,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(3)
      }
    },
    components: {
      eInput
    },
    methods: {
      ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
      register () {
          this.$router.push('/register')
      },
      login () {
        this.$v.$touch()

        if (this.$v.$error) {
          return
        }

        var qs = require('qs');
        var data = {
            email : this.email,
            password : this.password
        }
        this.$http.post('login', qs.stringify(data))
        .then(response => {
            this.$auth.login(JSON.stringify(response.data.data.user), response.data.data.token, response.data.data.expired_at)
            this.$store.state.authUser = response.data.data.user
            this.setLayoutNeeded(true)
            this.setIsLoginPage(false)
            this.$router.push('/post')
        })
        .catch(e => {
            console.log('Error', e.message);
            Toast.create('Error : ' + e.message)
        })
      },
      startAnimation () {
        this.vivus = new Vivus('logo', {
            duration: 400,
            forceRender: false
          }, function(element) {
            for (let item of element.el.children[0].children) {
              item.setAttribute('style', 'fill:white')
              item.setAttribute('style', 'fill:white')
            }
          }
        )
      }
    }
  }
</script>
<style scoped>
  .card {
    margin-bottom: 0px;
  }
  .card-content {
    min-height: 160px;
  }
  button {
    margin-bottom: 4%;
  }
  h4 {
    font-weight: 300;
  }
  a {
    font-size: 14px;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
  }
  a:hover {
    text-decoration: underline;
    color: #2d7788;
  }
  a:focus {
    text-decoration: none;
  }
</style>
