<template>
  <div id="app">
      <Navbar/>
      <br>
      <div class="container">
        <errors v-if="error" :msg="error"></errors>
            <router-view/>
      </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar';
import Errors from '@/components/Errors';
import { mapGetters } from 'vuex';
export default {
  components: {
    Navbar,
    Errors
  },
  computed:{
    ...mapGetters(['error'])
  }
}
</script>
<style>

</style>
