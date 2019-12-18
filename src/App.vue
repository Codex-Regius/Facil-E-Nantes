<template>
  <div id="app">
    <Header facil="Facil" enantes="E-Nantes"/>
    <Map /> 
    <Defibrilateur />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Map from './components/Map.vue'
import Defibrilateur from './components/Defibrilateur.vue'

export default {
  name: 'app',
  components: {
    Header,
    Map,
    Defibrilateur
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
