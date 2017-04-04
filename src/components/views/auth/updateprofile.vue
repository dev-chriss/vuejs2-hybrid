<template>
  <div>
    <div class="layout-padding ">
      <div class="card width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto ">
        <div class="card-title bg-teal text-white row items-center">
          <div class="width-4of5" style="margin-left:5px;">Update Profile</div>
        </div>
        <div class="card-content bg-white text-dark">
          <e-input
              type="text"
              label="Name"
              v-model="name"
              :validation="$v.name"
              :validation-messages="validationMessages.name"
              :value="name"
          ></e-input>

          <q-datetime class="full-width" style="margin: 20px auto; "
            v-model="birthdate" label="Birth Date"
            type="date"
          ></q-datetime>

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
  import { required, minLength } from 'vuelidate/lib/validators'
  import moment from 'moment'

  export default {
    data () {
      return {
        name: this.getUserName(),
        birthdate: this.getUserBirthDate(),
        validationMessages: {
          name: {
            required: 'Name is required.',
            minLength: 'Minimum 3 characters.'
          }
        }
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(3)
      }
    },
    components: {
      eInput
    },
    methods: {
      reset () {
        this.$v.$reset()
      },
      getUserName () {
        var name = this.$auth.getUserAuthName()
        if (name) {
          return name
        }
        return ''
      },
      getUserBirthDate () {
        var birthdate = this.$auth.getUserBirthDate()
        if (birthdate) {
          return birthdate
        }
        return ''
      },
      save () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        var qs = require('qs')
        var data = {
          name: this.name,
          birthdate: moment(this.birthdate).format('YYYY-MM-DD')
        }

        this.$http.put('user/profile', qs.stringify(data))
        .then(response => {
          // update local storage
          localStorage.setItem('user', JSON.stringify(response.data.data))

          // update vuex store
          this.$store.state.authUser = response.data.data
          this.reset()
          Dialog.create({ message: ' Profile updated!' })
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
