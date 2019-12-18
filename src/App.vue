<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Map2 />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Map from './components/Map.vue'
import Map2 from './components/Map2'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Map2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
