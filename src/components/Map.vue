<template>
  <div style="height: 500px; width: 500px">
    <LMap
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <LTileLayer :url="url"></LTileLayer>
      <LMarker :lat-lng="markerLatLng"></LMarker>
      <LMarker v-show="none" id="toilette" v-for="record in records" :key="record" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
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
      records: []
    };
  },
  beforeCreate() {
     axios.get('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&rows=65&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr&refine.commune=Nantes&exclude.commune=Thouar%C3%A9-sur-Loire&exclude.commune=Carquefou&exclude.commune=Rez%C3%A9&exclude.commune=Le+Pellerin')
    .then(response => {this.records = response.data.records, console.log(response.data.records)})
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
