<template>
  <div>
    <div class="layout-padding ">
      <div class="card">
        <div class="card-title bg-teal text-white row items-center">
          <div class="width-4of5" style="margin-left:5px;">User List</div>
          <div class="auto" style="text-align:right;">
            <button class="bordered blue small" @click="addRow()">
              <i>add</i>
              <q-tooltip>Add User</q-tooltip>
            </button>
          </div>
        </div>

        <q-data-table
          :data="users"
          :config="config"
          :columns="columns"
          @refresh="refresh">
          <!-- Custom renderer when user selected one or more rows -->
          <template slot="selection" scope="selection">
            <button class="primary clear" @click="editRow(selection)">
              <i>edit</i>    Edit
            </button>
            <button class="primary clear" @click="deleteRow(selection)">
              <i>delete</i>    Delete
            </button>
          </template>
        </q-data-table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { Platform, Toast, Dialog } from 'quasar'
  import storeUser from './storeUser'
  import moment from 'moment'

  export default {
    name: 'User',
    mounted () {
      this.getUsers()
    },
    data () {
      return {
        users: [],
        config: {
          // title: 'Users Table',
          refresh: true,
          // (optional)
          // User can choose displayed columns
          columnPicker: true,
          // (optional) How many columns from the left are sticky
          leftStickyColumns: 1,
          // (optional) How many columns from the right are sticky
          rightStickyColumns: 0,
          bodyStyle: {
            maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 10,
            options: [5, 10, 20, 50, 100]
          },
          messages: {
            noData: '<i>warning</i> No data available to show.',
            noDataAfterFiltering: '<i>warning</i> No results. '
          },
          selection: 'single',
          // (optional) Override default labels. Useful for I18n.
          labels: {
            columns: 'Visible Column',
            clear: 'Cancel',
            selected: {
              singular: 'item selected.   ',
              plural: 'items selected.   '
            }
          }
        },
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: true,
            filter: true,
            width: 'auto'
          },
          {
            label: 'Email',
            field: 'email',
            sort: true,
            filter: true,
            width: 'auto'
          },
          {
            label: 'Birth Date',
            field: 'birthdate',
            sort: true,
            filter: true,
            width: 'auto',
            format (value) {
              if (value) {
                return moment(value).format('MMM DD YYYY')
              }
            }
          },
          {
            label: 'Role',
            field: 'role',
            sort: true,
            filter: true,
            width: '100px'
          },
          {
            label: 'Active',
            field: 'active',
            width: '70px',
            format (value) {
              if (value) {
                return '<i class="text-green">check_circle</i>'
              }
              return '<i class="text-red">remove_circle</i>'
            }
          }
        ],
        pagination: true,
        rowHeight: 50,
        bodyHeightProp: 'maxHeight',
        bodyHeight: 500
      }
    },
    methods: {
      getUsers () {
        this.$http.get('users')
        .then(response => {
          this.users = response.data.data
        })
      },
      addRow () {
        storeUser.state.selectedUser = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: '',
          birthdate: '',
          active: ''
        }
        this.$router.push('/userAdd')
      },
      editRow (props) {
        storeUser.state.selectedUser = props.rows[0].data
        this.$router.push('/userEdit')
      },
      deleteRow (props) {
        var users = this.users
        var axios = this.$http

        Dialog.create({
          title: 'Confirm',
          message: 'Are you sure want to delete ? ',
          buttons: [
            {
              label: 'Yes',
              handler () {
                axios.delete('users/' + props.rows[0].data.id)
                .then(response => {
                  var name = props.rows[0].data.name
                  users.splice(props.rows[0].index, 1)
                  Toast.create(name + ' deleted!')
                })
                .catch(e => {
                  console.log('Error : ' + e.message)
                  Toast.create('Error : ' + e.message)
                })
              }
            },
            {
              label: 'No'
            }
          ]
        })
      },
      refresh (done) {
        this.$http.get('users')
        .then(response => {
          this.users = response.data.data
          done()
        })
      }
    }
  }
</script>
<style>
  #map {
    height: 180px;
  }
  .modal-scroll {
    max-height: 1000px !important;
    max-width: 1000px !important;
  }
</style>
