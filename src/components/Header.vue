<template>
  <div class="header">
    <div class="name">
      <h1 class="facil">{{ facil }}</h1>
      <h1>{{ enantes }}</h1>
    </div>
    <div class="divMeteo">
      <h3>Prévision Météo de Nantes</h3>
      <div class="meteo">
        <img v-bind:src="meteo[0].observation[0].iconLink + '?apiKey=3eDEt59IRt4OTDgu72sWOEcUtZjEH3MZFuqEoizPP1M'"/>
        <p>{{meteo[0].observation[0].skyDescription}}</p>
        <p>{{Math.round(meteo[0].observation[0].temperature)}}°C</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      meteo: []
    }
  },
  beforeCreate(){
    axios.get('http://localhost:8050/')
        .then(response => {
          console.log(response.data.observations.location)
          this.meteo = response.data.observations.location
        })
  },
  name: 'Header',
  props: {
    facil: String,
    enantes: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  background: lightgray;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px
}

@media screen and (min-width: 850px){
  .header{
    flex-direction: row
  }
}

h1{
  margin: 0px;
  height: 100%;
  color: #F18C00;
}

.facil{
  color: #007BC1;
  margin-right: 5px;
}
.divMeteo{
  margin-top: 20px;
}

.meteo{
  display: flex;
  justify-content: center;
  align-items: center;
}

.meteo p{
  margin-right: 10px;
  margin-left: 10px;
}

.name{
  display: flex;
}

</style>
