<template>
  <div>
    <div class="layout-padding ">
      <div class="card width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto ">
        <div class="card-title bg-teal text-white row items-center">
          <div class="width-4of5" style="margin-left:5px;">Change Password</div>
        </div>
        <div class="card-content bg-white text-dark">
          <e-input
            type="password"
            label="Old Password"
            v-model="old_password"
            :validation="$v.old_password"
            :validation-messages="validationMessages.old_password"
            :value="old_password"
            ></e-input>
          <e-input
              type="password"
              label="New Password"
              v-model="password"
              :validation="$v.password"
              :validation-messages="validationMessages.password"
              :value="password"
              ></e-input>
            <e-input
              type="password"
              label="Confirm New Password"
              v-model="password_confirmation"
              :validation="$v.password_confirmation"
              :validation-messages="validationMessages.password_confirmation"
              :value="password_confirmation"
              ></e-input>

              <div class="row card-actions justify-end ">
                <button class="blue bg-blue-8" style="width:100px;" @click="save()">Save</button>
              </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Dialog } from 'quasar'
  import eInput from '../../custom/eInput.vue'
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        old_password: '',
        password: '',
        password_confirmation: '',
        validationMessages: {
          old_password: {
            required: 'Old Password is required.',
            minLength: 'Minimum 3 characters.'
          },
          password: {
            required: 'New Password is required.',
            minLength: 'Minimum 3 characters.'
          },
          password_confirmation: {
            required: 'New Password confirmation is required.',
            minLength: 'Minimum 3 characters.',
            sameAsPassword: 'Password must identical.'
          }
        }
      }
    },
    validations: {
      old_password: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(3)
      },
      password_confirmation: {
        required,
        minLength: minLength(3),
        sameAsPassword: sameAs('password')
      }
    },
    components: {
      eInput
    },
    methods: {
      reset () {
        this.$v.$reset()
        this.old_password = ''
        this.password = ''
        this.password_confirmation = ''
      },
      save () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        var qs = require('qs')
        var data = {
          old_password: this.old_password,
          password: this.password,
          password_confirmation: this.password_confirmation
        }

        this.$http.put('user/password', qs.stringify(data))
        .then(response => {
          // console.log(response)
          this.reset()
          Dialog.create({ message: ' Password updated!' })
        })
        .catch(e => {
          Dialog.create({ message: 'Error : ' + e.message })
        })
      }
    }
  }
</script>
<style scoped>
  .flex {
    margin-top: 1%;
  }
</style>
