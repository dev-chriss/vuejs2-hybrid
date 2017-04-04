<template>
  <div>
    <div class="layout-padding ">
      <div class="card  width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto ">
        <div class="card-title bg-teal text-white row items-center">
          <div class="width-4of5" style="margin-left:5px;">User Edit</div>
        </div>
        <div class="card-content bg-white text-dark">
          <e-input
              type="text"
              label="Full Name"
              v-model="name"
              :validation="$v.name"
              :validation-messages="validationMessages.name"
              :value="name"
          ></e-input>
          <e-input
              type="text"
              label="Email"
              v-model="email"
              :validation="$v.email"
              :validation-messages="validationMessages.email"
              :value="email"
          ></e-input>

          <e-select
            type="list"
            label="Role"
            v-model="role"
            :validation="$v.role"
            :validation-messages="validationMessages.role"
            :value="role"
            :options="optionRole"
          ></e-select>

          <e-select
            type="list"
            label="Active"
            v-model="active"
            :validation="$v.active"
            :validation-messages="validationMessages.active"
            :value="active"
            :options="optionActive"
          ></e-select>

          <q-datetime class="full-width" style="margin: 20px auto; "
            v-model="birthdate" label="Birth Date"
            type="date"
          ></q-datetime>

          <div class="text-blue text-center" style="margin:20px;">If doesn't want change password, please leave them empty</div>
          <e-input
              type="password"
              label="Password"
              v-model="password"
              :validation="$v.password"
              :validation-messages="validationMessages.password"
              :value="password"
          ></e-input>
          <e-input
              type="password"
              label="Confirm Password"
              v-model="password_confirmation"
              :validation="$v.password_confirmation"
              :validation-messages="validationMessages.password_confirmation"
              :value="password_confirmation"
          ></e-input>
        </div>

        <div class="row card-actions justify-end ">
          <div style="margin-right:10px;">
            <button class="blue bg-blue-8" style="width:100px;" @click="cancel()">Cancel</button>
          </div>
          <button class="blue bg-blue-8" style="width:100px;" @click="save()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Toast } from 'quasar'
  import eInput from '../../custom/eInput.vue'
  import eSelect from '../../custom/eSelect.vue'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import storeUser from './storeUser'
  import moment from 'moment'

  export default {
    data () {
      return {
        selectedUser: this.getUserSelected(),

        name: this.selectedUser.name,
        email: this.selectedUser.email,
        role: this.selectedUser.role,
        active: this.selectedUser.active,
        birthdate: this.selectedUser.birthdate,
        password: '',
        password_confirmation: '',
        validationMessages: {
          name: {
            required: 'Name is required.',
            minLength: 'Minimum 3 characters.'
          },
          email: {
            required: 'Email is required.',
            minLength: 'Minimum 6 characters.',
            email: 'Email is not valid.'
          },
          role: {
            required: 'Role is required.'
          },
          active: {
            required: 'Active is required.'
          },
          password: {
            minLength: 'Minimum 3 characters.'
          },
          password_confirmation: {
            minLength: 'Minimum 3 characters.',
            sameAsPassword: 'Password must identical.'
          }
        },
        optionRole: [
          { label: 'Superadmin', value: 'superadmin' },
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' }
        ],
        optionActive: [
          { label: 'Yes', value: true },
          { label: 'No', value: false }
        ]
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email,
        minLength: minLength(6)
      },
      password: {
        minLength: minLength(3)
      },
      password_confirmation: {
        minLength: minLength(3),
        sameAsPassword: sameAs('password')
      },
      role: {
        required
      },
      active: {
        required
      }
    },
    components: {
      eInput,
      eSelect
    },
    mounted: function mounted () {
      this.setOptionRole()
    },
    methods: {
      setOptionRole () {
        var role = this.$auth.getUserAuthRole()
        if (role === 'superadmin') {
          this.optionRole = [
            { label: 'Superadmin', value: 'superadmin' },
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
          ]
        }
        else if (role === 'admin') {
          this.optionRole = [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
          ]
        }
      },
      getUserSelected () {
        this.selectedUser = storeUser.state.selectedUser
        return this.selectedUser
      },
      cancel () {
        this.$router.push('/user')
      },
      save () {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }

        var qs = require('qs')
        var selectedUser = this.getUserSelected()
        var data = {
          name: this.name,
          email: this.email,
          birthdate: moment(this.birthdate).format('YYYY-MM-DD'),
          password: this.password,
          password_confirmation: this.password_confirmation,
          role: this.role,
          active: this.active
        }

        this.$http.put('users/' + selectedUser.id, qs.stringify(data))
        .then(response => {
          Toast.create('User updated ')
          this.$router.push('/user')
        })
        .catch(e => {
          Toast.create('Error : ' + e.message)
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
