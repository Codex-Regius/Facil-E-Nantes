<template>
  <div style="height: 500px; width: 500px">
    <!-- <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>-->
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="[47.413220, -1.219482]" >
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="static/images/baseball-marker.png"
        ></l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-icon", LIcon);

export default {
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [47.213039, -1.549931],
      bounds: null,
      icon: L.icon({
        iconUrl: "static/images/baseball-marker.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: "Foobar",
      iconSize: 64
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
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
