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
      <LPolygon :lat-lngs="polygon.coords" :color="polygon.color"></LPolygon>
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
      polygon: {
        name: "Bouffay",
        coords: [
          [47.217778, -1.557083],
          [47.218171, -1.551526],
          [47.218346, -1.551311],
          [47.219468, -1.549358],
          [47.216408, -1.546762],
          [47.213857, -1.55498]
        ],
        color: "lightGreen"
      }
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
