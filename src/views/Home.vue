<template>
  <div class="home">
    <home-page msg="Welcome to 62130500093 Groupwork SPA Shop"/>
    <img alt="logo" src="http://www.palmphoneutt.com/wp-content/uploads/2018/09/Shop-icon.png">
  <div class="btn">
    <div id="viewBtn">
      <router-link to="/products"> View Products </router-link>
    </div>
    <div id="contactBtn">
      <router-link to="/about"> Contact Me </router-link>
    </div>
  </div>
  </div>
  <bottom><copyright-component></copyright-component></bottom>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>
