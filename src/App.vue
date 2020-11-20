<template>
  <v-app>
 <Navbar/>

    <v-main id="main" style="margin-top: 64px; padding: 0; display: flex">
    <!-- Provides the application the proper gutter -->
    <v-container fluid style="padding: 0">

      <!-- If using vue-router -->
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-main>

    <v-footer style="display: block; padding: 0;"
    >
      <player></player>
    </v-footer>
  </v-app>
</template>

<script>


import Player from "@/components/player";
import Navbar from "@/components/navbar";
export default {
  name: 'App',

  components: {
    Navbar,
    Player

},
  created() {
    this.$store.dispatch("getCookie")
    console.log(this.$store.state.userdata.userdata.slug)
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.fade-leave-active{
  transition: opacity .3s ease;
}
.fade-enter-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
