<template>
  <l-map
    style="height: 500px; width: 500px"
    :zoom="zoom"
    :center="center"
    :options="{zoomControl: false}"
  >
    <l-tile-layer :url="url"></l-tile-layer>

    <l-marker :lat-lng="[47.20724420384006,-1.5558364437694028]">
      <l-icon :icon="staticAnchor" class-name="someExtraClass">
        <!-- <div class="headline">{{ customText }}</div>  PERMET D'AJOUTER DU TEXT AU DESSUS -->
        <img src="./baseball-marker.png" />
        <l-popup>Hello!</l-popup>
        <l-tooltip>Hello!</l-tooltip>
      </l-icon>
    </l-marker>

  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPopup, LTooltip } from "vue2-leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-icon", LIcon);
Vue.component("l-popup", LPopup);
Vue.component("l-tooltip", LTooltip);



export default {
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [47.213039, -1.549931],
      icon: L.icon({
        iconUrl: "./baseball-marker.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: "HELLO WORLD",
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
  }
};
</script>