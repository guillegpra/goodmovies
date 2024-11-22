<script>
import MovieList from './components/MovieList.vue';
import MovieDetail from './components/MovieDetail.vue';

export default {
  name: 'App',
  components: {
    MovieList,
    MovieDetail,
  },
};
</script>

<template>
  <!-- Navigation Bar -->
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/favorites" class="nav-link">Your favorites</router-link>
  </nav>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #E5E4E2;
  margin-top: 20px;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}

.nav-link {
  text-decoration: none;
  font-size: 18px;
  margin: 0 10px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
