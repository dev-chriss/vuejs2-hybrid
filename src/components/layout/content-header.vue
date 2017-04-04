<template>
  <div class="content-header" v-if="!getIsLoginPage">
    <span id="content-header-title" class="vertical-bottom">{{routerTitle}}</span>
    <hr>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getIsLoginPage']),
      routerTitle () {
        return this.$route.meta.name
      }
    }
  }
</script>
<style scoped>
  #configurations {
    position: absolute;
    right: 65px;
    top: 7px;
  }
  .content-header {
    position: relative;
    padding: 1em 4em 0em 4em;
  }
  @media screen and (max-width: 600px){
    .content-header {
      padding: 1.5em .5em;
    }
    #configurations {
      position: absolute;
      right: 8px;
      top: 12px;
    }
  }
  #content-header-title {
    font-size: 22px;
    font-weight: 300;
  }
  .q-popover{
    padding:8px;
  }
</style>
