<template>
  <v-app>
    <Navbar/>
    <v-main class="black">
      <router-view></router-view>
    </v-main>
    <Foot/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Foot from '@/components/Footer.vue'

export default {
  name: 'App',

  components: {
    Navbar, Foot
  },

  data: () => ({
    //
  }),
};
</script>
<style>
h1 {
  color: white;
}
</style>
