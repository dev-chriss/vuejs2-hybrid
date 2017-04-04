<template>
  <div>
    <div class="layout-padding">
      <div class="card">
        <div class="card-title bg-teal text-white row items-center">
          <div class="width-4of5" style="margin-left:5px;">Post List</div>
          <div class="auto" style="text-align:right;">
            <button class="bordered blue small" @click="addRow()">
              <i>add</i>
              <q-tooltip>Add Post</q-tooltip>
            </button>
          </div>
        </div>

        <q-data-table
          :data="posts"
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
  import moment from 'moment'

  export default {
    name: 'Post',
    mounted () {
      this.getPosts()
    },
    data () {
      return {
        posts: [],
        config: {
          // title: 'Post Table',
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
            label: 'Title',
            field: 'title',
            sort: true,
            filter: true
          },
          {
            label: 'Content',
            field: 'content',
            sort: false,
            filter: true
          },
          {
            label: 'Author',
            field: 'author',
            sort: true,
            filter: true,
            width: '150px'
          },
          {
            label: 'Updated At',
            field: 'updated_at',
            sort: true,
            filter: true,
            width: '120px',
            format (value) {
              if (value) {
                return moment(value).format('MMM DD, YYYY')
              }
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
      getPosts () {
        this.$http.get('posts')
        .then(response => {
          this.posts = response.data.data
        })
      },
      addRow () {
        var axios = this.$http
        var qs = require('qs')
        var posts = this.posts

        Dialog.create({
          title: 'Post Add',
          noBackdropDismiss: true,
          message: '',
          form: {
            title: {
              type: 'textbox',
              label: 'Title',
              model: ''
            },
            content: {
              type: 'textarea',
              label: 'Content',
              model: ''
            }
          },
          buttons: [
            {
              label: 'Cancel',
              classes: 'secondary',
              style: 'margin-left: 10px; width:100px;'
            },
            {
              label: 'Save',
              classes: 'secondary',
              style: 'margin: auto 10px; width:100px;',
              handler (data) {
                Dialog.create({
                  title: 'Confirm',
                  message: 'Are you sure want to add posts ? ',
                  buttons: [
                    {
                      label: 'No'
                    },
                    {
                      label: 'Yes',
                      handler () {
                        axios.post('posts', qs.stringify(data))
                        .then(response => {
                          posts.unshift(response.data.data)
                          Toast.create('Post added!')
                        })
                        .catch(e => {
                          console.log('Error : ' + e.message)
                          Toast.create('Error : ' + e.message)
                        })
                      }
                    }
                  ]
                })
              }
            }
          ]
        })
      },
      editRow (props) {
        var post = props.rows[0].data
        var axios = this.$http
        var qs = require('qs')

        Dialog.create({
          title: 'Post Detail',
          noBackdropDismiss: true,
          message: '',
          form: {
            title: {
              type: 'textbox',
              label: 'Title',
              model: post.title.trim()
            },
            content: {
              type: 'textarea',
              label: 'Content',
              model: post.content.trim()
            }
          },
          buttons: [
            {
              label: 'Cancel',
              classes: 'secondary',
              style: 'margin-left: 10px; width:100px;',
              handler (data) {
                // temporary change to triggering clearSelection
                var tmp = post.content
                post.content = 'triggering clearSelection'
                post.content = tmp
              }
            },
            {
              label: 'Save',
              classes: 'secondary',
              style: 'margin: auto 10px; width:100px;',
              handler (data) {
                var newItem = {
                  id: post.id,
                  title: data.title,
                  content: data.content,
                  user_id: post.user_id
                }

                axios.put('posts/' + post.id, qs.stringify(newItem))
                .then(response => {
                  console.log(JSON.stringify(response.data.data))
                  post.content = ''
                  post.title = response.data.data.title
                  post.content = response.data.data.content
                  Toast.create('Data updated!')
                })
                .catch(error => {
                  var tmp = post.content
                  post.content = 'triggering clearSelection'
                  post.content = tmp
                  if (error.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data)
                    // console.log(error.response.status)
                    // console.log(error.response.headers)
                    Toast.create('Error : ' + error.response.data.message)
                  }
                  else {
                    // Something happened in setting up the request that triggered an Error
                    Toast.create('Error', error.message)
                  }
                })
              }
            }
          ]
        })
      },
      deleteRow (props) {
        var posts = this.posts
        var axios = this.$http

        Dialog.create({
          title: 'Confirm',
          message: 'Are you sure want to delete ? ',
          buttons: [
            {
              label: 'No',
              classes: 'secondary',
              style: 'margin-left: 10px; width:100px;',
              handler () {
                // temporary change to triggering clearSelection
                var tmp = props.rows[0].data.content
                props.rows[0].data.content = 'triggering clearSelection'
                props.rows[0].data.content = tmp
              }
            },
            {
              label: 'Yes',
              classes: 'secondary',
              style: 'margin: auto 10px; width:100px;',
              handler () {
                axios.delete('posts/' + props.rows[0].data.id)
                .then(response => {
                  posts.splice(props.rows[0].index, 1)
                  Toast.create('Post deleted!')
                })
                .catch(error => {
                  // temporary change to triggering clearSelection
                  var tmp = props.rows[0].data.content
                  props.rows[0].data.content = 'triggering clearSelection'
                  props.rows[0].data.content = tmp

                  if (error.response) {
                    Toast.create('Error : ' + error.response.data.message)
                  }
                  else {
                    Toast.create('Error', error.message)
                  }
                })
              }
            }
          ]
        })
      },
      refresh (done) {
        // this.timeout = setTimeout(() => {
        //  done()
        // }, 5000)
        this.$http.get('posts')
        .then(response => {
          this.posts = response.data.data
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

  .modal.minimized .modal-content {
    height: auto !important;
    width: 700px !important;
  }
</style>
