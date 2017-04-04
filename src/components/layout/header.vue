<template>
  <div class="toolbar" v-show="getLayoutNeeded">
    <q-ajax-bar color="#80cbc4"></q-ajax-bar>
    <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
      <button>
        <i>arrow_back</i>
      </button>
    </router-link>
    <button class="hide-on-drawer-visible" @click="$parent.$children[1].$refs.leftDrawer.open()" v-else >
      <i>menu</i>
    </button>
    <q-toolbar-title :padding="1">
      Admin Panel
    </q-toolbar-title>
    <div class="right-itens">
      <!-- <a @click="setMobileMode(true)" class="text-white gt-sm inline" target="_blank">
        <i class="fa fa-3x fa-mobile"></i> <q-tooltip>Mobile version</q-tooltip>
      </a> -->
      <a href="https://github.com/chrissetyawan" class="text-white" target="_blank">
        <i class="fa fa-2x fa-github"></i>
      </a>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'header',
    computed: {
      ...mapGetters(['getLayoutNeeded'])
    },
    methods: {
      ...mapMutations(['setMobileMode'])
    }
  }
</script>
<style scoped>
  .toolbar{
    min-height: 60px;
  }
  .right-itens a{
    margin-right: 10px;
  }
</style>
