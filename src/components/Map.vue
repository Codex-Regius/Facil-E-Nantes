<template>
  <div style="height: 500px; width: 100%">
    <ul class="firstInput">
      <li>
        <input type="checkbox" id="toilette" value="toilette" v-model="toiletteShow"/>
        <label for="toilette">Toilettes Public</label>
      </li>
      <li>
        <input type="checkbox" id="Gonfleur" value="Gonfleur" v-model="gonfleurShow">
        <label for="Gonfleur">Gonfleur à velo en libre service</label>
      </li>
      <li>
        <input type="checkbox" id="Abris-vélo" value="Abris-vélo" v-model="abrisShow">
        <label for="Abris-vélo">Abris vélo</label>
      </li>
      <li>
        <input type="checkbox" id="Wifi" value="Wifi" v-model="wifiShow">
        <label for="Wifi">Wifi Public</label>
      </li>
    </ul>
    <ul class="secondInput">
      <li>
        <input type="checkbox" id="Composteur" value="Composteur" v-model="composteShow">
        <label for="Composteur">Composteur de quartier</label>
      </li>
      <li>
        <input type="checkbox" id="decheterie" value="decheterie" v-model="decheteriesShow">
        <label for="decheterie">Décheteries</label>
      </li>
    </ul>
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
      <LMarker v-if="gonfleurShow === true" id="gonfleur" v-for="record in gonfleur" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]">
        <l-icon :icon-anchor="staticAnchor" :icon-size="iconSize">
          <img src="../../public/Assets/GonfleurVeloOK.png">
        </l-icon>
      </LMarker>
      <LMarker v-if="toiletteShow === true" id="toilette" v-for="record in toilette" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]">
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/wcPublicOK.png">
        </l-icon>
      </LMarker>
      <LMarker v-if="composteShow === true" id="composte" v-for="record in composte" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]">
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/ComposteursOK.png">
        </l-icon>
      </LMarker>
      <LMarker v-if="abrisShow === true" id="abris" v-for="record in abris" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]">
        <l-icon :icon-anchor="staticAnchor" >
          <img src="../../public/Assets/abrisVeloOK.png">
        </l-icon>
      </LMarker>
      <LMarker v-if="wifiShow === true" id="wifi" v-for="record in wifi" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
      <LMarker v-if="decheteriesShow === true" id="decheterie" v-for="record in decheteries" :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]">
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/recyclerieOK.png">
        </l-icon>
      </LMarker>
      <LMarker v-for="record in defibrillateur" v-if="record.geometry !== undefined && defibrillateurShow === true" id="defibrillateur"  :show='false' :key="record.recordid" :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"></LMarker>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPolygon } from "vue2-leaflet";
import { Icon } from "leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";
import axios from 'axios';

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-polygon", LPolygon);
Vue.component("l-icon", LIcon);

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
          color: "orchid"
        },
        {
          name: "Malakoff Saint-Donatien",
          coords: [
            [47.235252, -1.548665],
            [47.235369, -1.54712],
            [47.233504, -1.533473],
            [47.222138, -1.517766],
            [47.216891, -1.515105],
            [47.213218, -1.526091],
            [47.211178, -1.538623],
            [47.215652, -1.54491],
            [47.215565, -1.546584],
            [47.21641, -1.546755],
            [47.22291, -1.55242],
            [47.227311, -1.553708],
            [47.231915, -1.5483],
            [47.235307, -1.548684]
          ],
          color: "steelBlue"
        },
        {
          name: "Doulon-Bottière",
          coords: [
            [47.262206, -1.494517],
            [47.259061, -1.494173],
            [47.258507, -1.495676],
            [47.258391, -1.494817],
            [47.257284, -1.494045],
            [47.256993, -1.491813],
            [47.254546, -1.496276],
            [47.250759, -1.494817],
            [47.245574, -1.488981],
            [47.245574, -1.488981],
            [47.240854, -1.480741],
            [47.238581, -1.484689],
            [47.232025, -1.472887],
            [47.223865, -1.484389],
            [47.217103, -1.515116],
            [47.222, -1.517519],
            [47.233307, -1.533141],
            [47.23389, -1.535887]
          ],
          color: "tomato"
        },
        {
          name: "Haut-Pavés-Saint-Felix",
          coords: [
            [47.242555, -1.546388],
            [47.238126, -1.549821],
            [47.232706, -1.547933],
            [47.227402, -1.553598],
            [47.22169, -1.552825],
            [47.220407, -1.555057],
            [47.217901, -1.562267],
            [47.2186, -1.563554],
            [47.218658, -1.56364],
            [47.218484, -1.566301],
            [47.217784, -1.5657],
            [47.215277, -1.572137],
            [47.214636, -1.57291],
            [47.214752, -1.574626],
            [47.216618, -1.575313],
            [47.217609, -1.57454],
            [47.2193, -1.577716],
            [47.219883, -1.577287],
            [47.22169, -1.57866],
            [47.222389, -1.580463],
            [47.222156, -1.585441],
            [47.227344, -1.582179],
            [47.230083, -1.571536],
            [47.23428, -1.563296],
            [47.236785, -1.563468],
            [47.239597, -1.560872],
            [47.241083, -1.556623],
            [47.243385, -1.556323],
            [47.243064, -1.553662],
            [47.243523, -1.552063],
            [47.243567, -1.548737],
            [47.24262, -1.546484]
          ],
          color: "yellow"
        },
        {
          name: "Breil Barberie",
          coords: [
            [47.247229, -1.57746],
            [47.245481, -1.571281],
            [47.243616, -1.564843],
            [47.243849, -1.564328],
            [47.243908, -1.562182],
            [47.24315, -1.560981],
            [47.242917, -1.558234],
            [47.242451, -1.557376],
            [47.242626, -1.556432],
            [47.241111, -1.556689],
            [47.239669, -1.560788],
            [47.236842, -1.563363],
            [47.234074, -1.563534],
            [47.229586, -1.572375],
            [47.227692, -1.58173],
            [47.223604, -1.584604],
            [47.22577, -1.586758],
            [47.225828, -1.58762],
            [47.225506, -1.587878],
            [47.225887, -1.589472],
            [47.226882, -1.59167],
            [47.226677, -1.593523],
            [47.226355, -1.595548],
            [47.228052, -1.595935],
            [47.229427, -1.597142],
            [47.233465, -1.590248],
            [47.234459, -1.592058],
            [47.238467, -1.587835],
            [47.239286, -1.589386]
          ],
          color: "orange"
        },
        {
          name: "Dervallières-Zola",
          coords: [
            [47.229364, -1.597274],
            [47.227965, -1.595901],
            [47.226391, -1.595644],
            [47.226916, -1.591609],
            [47.225809, -1.58955],
            [47.225517, -1.587747],
            [47.225634, -1.586803],
            [47.223666, -1.584764],
            [47.222209, -1.585494],
            [47.222442, -1.580301],
            [47.221859, -1.578585],
            [47.219877, -1.57734],
            [47.219353, -1.577769],
            [47.217633, -1.574551],
            [47.216729, -1.57528],
            [47.214747, -1.574636],
            [47.214368, -1.572276],
            [47.209646, -1.570517],
            [47.209004, -1.568371],
            [47.20845, -1.567942],
            [47.20743, -1.570946],
            [47.206584, -1.576611],
            [47.209966, -1.590987],
            [47.209616, -1.595965],
            [47.210928, -1.609655],
            [47.215359, -1.605707],
            [47.224512, -1.603175]
          ],
          color: "cyan"
        },
        {
          name: "Chantenay-Bellevue-Sainte-Anne",
          coords: [
            [47.210743, -1.609626],
            [47.20981, -1.591258],
            [47.206544, -1.576495],
            [47.208789, -1.566496],
            [47.208498, -1.566067],
            [47.204649, -1.573362],
            [47.198118, -1.577568],
            [47.197243, -1.581516],
            [47.191353, -1.601085],
            [47.186103, -1.601],
            [47.18412, -1.608639],
            [47.184878, -1.622801],
            [47.189136, -1.622972],
            [47.188611, -1.631512],
            [47.189778, -1.63177],
            [47.189778, -1.633444],
            [47.189428, -1.633959],
            [47.190128, -1.640739],
            [47.191819, -1.642198],
            [47.193394, -1.61911],
            [47.197156, -1.617265],
            [47.197622, -1.618209],
            [47.198504, -1.615902],
            [47.201377, -1.620322],
            [47.201581, -1.619636],
            [47.204307, -1.618284],
            [47.204161, -1.615473]
          ],
          color: "salmon"
        },
        {
          name: "Nantes-Nord",
          coords: [
            [47.27346, -1.593399],
            [47.274741, -1.58988],
            [47.27311, -1.583871],
            [47.271887, -1.576404],
            [47.271946, -1.568594],
            [47.269208, -1.563272],
            [47.269267, -1.562414],
            [47.268568, -1.561727],
            [47.269849, -1.55941],
            [47.269558, -1.558465],
            [47.268043, -1.558036],
            [47.265306, -1.558294],
            [47.264316, -1.555376],
            [47.261403, -1.555032],
            [47.260005, -1.553916],
            [47.259073, -1.555547],
            [47.258214, -1.554024],
            [47.257836, -1.551749],
            [47.2567, -1.550633],
            [47.254894, -1.539089],
            [47.251078, -1.539862],
            [47.247407, -1.544325],
            [47.242658, -1.546471],
            [47.243532, -1.548831],
            [47.243066, -1.553766],
            [47.243503, -1.556384],
            [47.242658, -1.556384],
            [47.244057, -1.562221],
            [47.24394, -1.564323],
            [47.243678, -1.568744],
            [47.245106, -1.57119],
            [47.245484, -1.570975],
            [47.24531, -1.573078],
            [47.246533, -1.575481],
            [47.247262, -1.57737],
            [47.253721, -1.576372]
          ]
        },
        {
          name: "Nantes Erdre",
          coords: [
            [47.294865, -1.532374],
            [47.2944, -1.525336],
            [47.295564, -1.520358],
            [47.29405, -1.515036],
            [47.294982, -1.508685],
            [47.29242, -1.506625],
            [47.286715, -1.5092],
            [47.280427, -1.50817],
            [47.275069, -1.509543],
            [47.272041, -1.499415],
            [47.262023, -1.507998],
            [47.260625, -1.503192],
            [47.23394, -1.535636],
            [47.235572, -1.548682],
            [47.237786, -1.549884],
            [47.258528, -1.537009],
            [47.26878, -1.536151],
            [47.279961, -1.526023]
          ],
          color: "lightCyan"
        },
        {
          name: "Nantes Sud",
          coords: [
            [47.198146, -1.549813],
            [47.203511, -1.530415],
            [47.200304, -1.526724],
            [47.197038, -1.531016],
            [47.196513, -1.524579],
            [47.192139, -1.525609],
            [47.189747, -1.518914],
            [47.189281, -1.512906],
            [47.187414, -1.512219],
            [47.188114, -1.514193],
            [47.187472, -1.515652],
            [47.186131, -1.514708],
            [47.186364, -1.515996],
            [47.186072, -1.517283],
            [47.184906, -1.516596],
            [47.180939, -1.517798],
            [47.183097, -1.531273],
            [47.192022, -1.53917],
            [47.195346, -1.544491],
            [47.194588, -1.545779],
            [47.196921, -1.548869],
            [47.197154, -1.549555]
          ],
          color: "Turquoise"
        }
      ],
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
      gonfleurShow: false,

      // icon: icon({
      //   iconUrl: "./GonfleurVelo.png",
      //   iconSize: [32, 37],
      //   iconAnchor: [16, 37]
      // }),
      staticAnchor: [16, 37],
      iconSize: [32, 37],
      iconSize: 20
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

    computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 0.5];
    }
  },

  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.firstInput{
  align-items: center;
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 29px;
}
.secondInput{
  align-items: center;
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 29px;
  margin-bottom: 29px;
}

input{
  margin-right: 5px;
}

</style>
