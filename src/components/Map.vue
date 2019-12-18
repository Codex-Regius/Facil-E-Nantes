<template>
  <div style="height: 500px; width: 500px">
    <input type="checkbox" id="toilette" value="toilette" v-model="toiletteShow"/>
    <label for="toilette">Toilettes Public</label>
    <input type="checkbox" id="Gonfleur" value="Gonfleur" v-model="gonfleurShow">
    <label for="Gonfleur">Gonfleur à velo en libre service</label>
    <input type="checkbox" id="Abris-vélo" value="Abris-vélo" v-model="abrisShow">
    <label for="Abris-vélo">Abris vélo</label>
    <input type="checkbox" id="Wifi" value="Wifi" v-model="wifiShow">
    <label for="Wifi">Wifi Public</label>
    <input type="checkbox" id="Composteur" value="Composteur" v-model="composteShow">
    <label for="Composteur">Composteur de quartier</label>
    <input type="checkbox" id="decheterie" value="decheterie" v-model="decheteriesShow">
    <label for="decheterie">Décheteries</label>
    <input type="checkbox" id="defibrillateur" value="defibrillateur" v-model="defibrillateurShow">
    <label for="defibrillateur">Défibrillateur</label>
    <LMap
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <LTileLayer :url="url"></LTileLayer>
      <LMarker v-if="gonfleurShow === true" id="gonfleur" v-for="record in gonfleur" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="toiletteShow === true" id="toilette" v-for="record in toilette" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="composteShow === true" id="composte" v-for="record in composte" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="abrisShow === true" id="abris" v-for="record in abris" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="wifiShow === true" id="wifi" v-for="record in wifi" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="decheteriesShow === true" id="decheterie" v-for="record in decheteries" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-for="record in defibrillateur" v-if="record.geometry !== undefined && defibrillateurShow === true" id="defibrillateur"  :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";
import axios from 'axios';

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});


export default {
  data() {
    return {
      url:
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGlyYXVkLWNvZWwiLCJhIjoiY2szem5od2Z4MGFrOTNnbW1ka3MwZWVlMSJ9.qKdr77MJ0XXL-t6Ii6yH8A",
      zoom: 13,
      center: [47.213039, -1.549931],
      markerLatLng: [47.216303, -1.550231],
      toilette: [],
      gonfleur: [],
      composte: [],
      abris: [],
      wifi: [],
      decheteries: [],
      defibrillateur: [],
      defibrillateurShow: false,
      decheteriesShow: false,
      wifiShow: false,
      abrisShow: false,
      composteShow: false,
      toiletteShow: false,
      gonfleurShow: false
    };
  },
  beforeCreate() {
     axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&rows=65&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr&refine.commune=Nantes&exclude.commune=Thouar%C3%A9-sur-Loire&exclude.commune=Carquefou&exclude.commune=Rez%C3%A9&exclude.commune=Le+Pellerin')
    .then(response => {this.toilette = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_gonfleurs-libre-service-nantes-metropole&rows=16&facet=commune&facet=conditions&refine.commune=Nantes')
    .then(response => {this.gonfleur = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=512042839_composteurs-quartier-nantes-metropole&rows=191&facet=categorie&facet=lieu&facet=annee&exclude.lieu=Cou%C3%ABron&exclude.lieu=Bouguenais&exclude.lieu=Rez%C3%A9&exclude.lieu=Sautron&exclude.lieu=Le+Pellerin&exclude.lieu=Orvault&exclude.lieu=Saint-Sebastien-sur-Loire&exclude.lieu=La+Choli%C3%A8re')
    .then(response => {this.composte = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_abris-velos-nantes-metropole&rows=83&facet=commune&facet=conditions&facet=gestionnaire&refine.commune=Nantes')
    .then(response => {this.abris = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_wifi-public-nantes-metropole&facet=nom')
    .then(response => {this.wifi = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_decheteries-ecopoints-nantes-metropole&rows=15&facet=libtype&facet=commune&facet=batteries&facet=bois&facet=carton&facet=gravats&facet=deee&facet=encombrants_menagers&facet=ferrailles&facet=huiles_moteur&facet=papiers_journaux_livres&facet=plastiques_menagers&facet=pneus&facet=textiles&facet=dechets_verts&facet=verre&facet=piles&facet=mobilier&facet=cartouches&facet=extincteur&facet=neons_lampes&facet=dechets_dangereux&facet=bouteilles_gaz')
    .then(response => {this.decheteries = response.data.records}),
    axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_defibrillateurs-nantes&rows=158&sort=designation&facet=nature_site')
    .then(response => {this.defibrillateur = response.data.records})
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  },
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
