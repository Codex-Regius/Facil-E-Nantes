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
      <LPolygon :lat-lngs="polygon[0].coords" :color="polygon[0].color"></LPolygon>
      <LPolygon :lat-lngs="polygon[1].coords" :color="polygon[1].color"></LPolygon>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolygon } from "vue2-leaflet";
import { Icon } from "leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-polygon", LPolygon);

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
      polygon: [
        {
          name: "Centre Ville",
          coords: [
            [47.214551, -1.572908],
            [47.215309, -1.572135],
            [47.215455, -1.570762],
            [47.217838, -1.565623],
            [47.218523, -1.566138],
            [47.218479, -1.5644],
            [47.218654, -1.56352],
            [47.217867, -1.56234],
            [47.221117, -1.555559],
            [47.220417, -1.555001],
            [47.221732, -1.552764],
            [47.22292, -1.552893],
            [47.222891, -1.552346],
            [47.216417, -1.546761],
            [47.215586, -1.546611],
            [47.215629, -1.544959],
            [47.211184, -1.538543],
            [47.20797, -1.549433],
            [47.209223, -1.561578],
            [47.208451, -1.566009],
            [47.208932, -1.566567],
            [47.20848, -1.567983],
            [47.209005, -1.568283],
            [47.209712, -1.570547],
            [47.214347, -1.572178]
          ],
          color: "lightGreen"
        },
        {
          name: "île de Nantes",
          coords: [
            [47.199682, -1.574667],
            [47.205455, -1.570461],
            [47.208546, -1.561578],
            [47.207088, -1.550849],
            [47.211228, -1.532181],
            [47.215892, -1.514242],
            [47.213064, -1.516688],
            [47.206796, -1.526387],
            [47.200032, -1.543596],
            [47.199186, -1.574281]
          ],
          color: "green"
        },
        {
          name: "Malakoff"
        }
      ]
    };
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
    LMarker,
    LPolygon
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
