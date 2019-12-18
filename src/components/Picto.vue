<template>
  <div>
    <h1>Picto</h1>
    <div id='names'>
      <input type="checkbox" id="toilette" value="toilette" v-model="checkedNames">
      <label for="toilette">Toilettes Public</label>
      <input type="checkbox" id="point-de-collecte" value="point-de-collecte" v-model="checkedNames">
      <label for="point-de-collecte">Points de Collecte</label>
       <input type="checkbox" id="Composteur" value="Composteur" v-model="checkedNames">
      <label for="Composteur">Composteur de quartier</label>
      <input type="checkbox" id="Gonfleur" value="Gonfleur" v-model="checkedNames">
      <label for="Gonfleur">Gonfleur à velo en libre service</label>
      <input type="checkbox" id="Abris-vélo" value="Abris-vélo" v-model="checkedNames">
      <label for="Abris-vélo">Abris vélo</label>
      <input type="checkbox" id="Wifi" value="Wifi" v-model="checkedNames">
      <label for="Wifi">Wifi Public</label>
      <br>
      <span>Propriétés cochés : {{ checkedNames }}</span>
    </div>
    <!-- <div>
      <ol>
        <li v-for="item in nom" :key="item">
          {{ item.fields.nom }}
          {{ item.geometry.coordinates[0] }}
          {{ item.geometry.coordinates[1] }}
        </li>
      </ol>
    </div>-->
  </div> 
</template>

<script>
import axios from 'axios';


export default {
  name: 'Picto',
  props: {
    records: []
  },
  data(){
    return {
      // nom : [],
      checkedNames: []
    }
  },
  //  beforeCreate() {
  //    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&rows=65&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr&refine.commune=Nantes&exclude.commune=Thouar%C3%A9-sur-Loire&exclude.commune=Carquefou&exclude.commune=Rez%C3%A9&exclude.commune=Le+Pellerin')
  //   .then(response => this.records = response.data.records)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
