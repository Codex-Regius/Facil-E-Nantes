<template>
  <div style="height: 500px; width: 100%">
    <form>
      <ul>
        <li>
          <input type="checkbox" id="centreville" @click="showPolygon(5)" name="centrevile" />
          <label for="centreville">Centre ville</label>
        </li>
        <li>
          <input type="checkbox" id="iledenantes" @click="showPolygon(3)" name="iledenantes" />
          <label for="iledenantes">Ile de nantes</label>
        </li>
        <li>
          <input type="checkbox" id="malakoff" @click="showPolygon(1)" name="malakoff" />
          <label for="malakoff">Malakoff Saint-Donatien</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="doulon-bottiere"
            @click="showPolygon(10)"
            name="doulon-bottiere"
          />
          <label for="doulon-bottiere">Doulon-Bottière</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="hautPave-saintFelix"
            @click="showPolygon(4)"
            name="hautPave-saintFelix"
          />
          <label for="hautPave-saintFelix">Haut Pavé - Saint Felix</label>
        </li>
        <li>
          <input type="checkbox" id="breil-barberie" @click="showPolygon(8)" name="breil-barberie" />
          <label for="breil-barberie">Breil barberie</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="dervalliere-zola"
            @click="showPolygon(0)"
            name="dervalliere-zola"
          />
          <label for="dervalliere-zola">Dervallières - Zola</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="chantenay-bellevue-sainteAnne"
            @click="showPolygon(2)"
            name="chantenay-bellevue-sainteAnne"
          />
          <label for="chantenay-bellevue-sainteAnne">Chantenay - Bellevue - Sainte Anne</label>
        </li>
        <li>
          <input type="checkbox" id="nantesNord" @click="showPolygon(7)" name="nantesNord" />
          <label for="nantesNord">Nantes Nord</label>
        </li>
        <li>
          <input type="checkbox" id="nantesErdre" @click="showPolygon(6)" name="nantesErdre" />
          <label for="nantesErdre">Nantes Erdre</label>
        </li>
        <li>
          <input type="checkbox" id="nantesSud" @click="showPolygon(9)" name="nantesSud" />
          <label for="nantesSud">Nantes Sud</label>
        </li>
      </ul>
    </form>
    <ul class="firstInput">
      <li>
        <input type="checkbox" id="toilette" value="toilette" v-model="toiletteShow" />
        <label for="toilette">Toilettes Public</label>
      </li>
      <li>
        <input type="checkbox" id="Gonfleur" value="Gonfleur" v-model="gonfleurShow" />
        <label for="Gonfleur">Gonfleur à velo en libre service</label>
      </li>
      <li>
        <input type="checkbox" id="Abris-vélo" value="Abris-vélo" v-model="abrisShow" />
        <label for="Abris-vélo">Abris vélo</label>
      </li>
      <li>
        <input type="checkbox" id="Wifi" value="Wifi" v-model="wifiShow" />
        <label for="Wifi">Wifi Public</label>
      </li>
    </ul>
    <ul class="secondInput">
      <li>
        <input type="checkbox" id="Composteur" value="Composteur" v-model="composteShow" />
        <label for="Composteur">Composteur de quartier</label>
      </li>
      <li>
        <input type="checkbox" id="decheterie" value="decheterie" v-model="decheteriesShow" />
        <label for="decheterie">Décheteries</label>
      </li>
    </ul>
    <input type="checkbox" id="defibrillateur" value="defibrillateur" v-model="defibrillateurShow" />
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
      <LMarker :lat-lng="[yourLatitude, yourLongitude]">
        <l-icon :icon-anchor="staticAnchor" :icon-size="iconSize">
          <img class="youHere" src="../../public/Assets/geolocalisation.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="gonfleurShow === true && isIn(record, checkedQuartiers)"
        id="gonfleur"
        v-for="record in gonfleur"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor" :icon-size="iconSize">
          <img src="../../public/Assets/GonfleurVeloOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="toiletteShow === true && isIn(record, checkedQuartiers)"
        id="toilette"
        v-for="record in toilette"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/wcPublicOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="composteShow === true && isIn(record, checkedQuartiers)"
        id="composte"
        v-for="record in composte"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/ComposteursOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="abrisShow === true && isIn(record, checkedQuartiers)"
        id="abris"
        v-for="record in abris"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/abrisVeloOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="wifiShow === true && isIn(record, checkedQuartiers)"
        id="wifi"
        v-for="record in wifi"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      ></LMarker>
      <LMarker
        v-if="decheteriesShow === true && isIn(record, checkedQuartiers)"
        id="decheterie"
        v-for="record in decheteries"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/recyclerieOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-for="record in defibrillateur"
        v-if="record.geometry !== undefined && defibrillateurShow === true && isIn(record, checkedQuartiers)"
        id="defibrillateur"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      ></LMarker>
      <LPolygon
        v-for="(polygon, index) in polygons"
        v-if="polygon.show === true"
        :key="index"
        :lat-lngs="polygon.coords"
        :fillColor="polygon.fillColor"
      ></LPolygon>
    </LMap>
    <div id="defibrillateurButton">
      <input
        type="checkbox"
        id="defibrillateur"
        value="defibrillateur"
        v-model="defibrillateurShow"
      />
      <label for="defibrillateur" id="defibrillateurLabel">
        <img src="../../public/Assets/defibrillatorWhite.png" /> Défibrillateurs
      </label>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPolygon } from "vue2-leaflet";
import { Icon } from "leaflet";
import Vue from "vue";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import inside from "point-in-polygon";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-icon", LIcon);
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
      staticAnchor: [16, 37],
      iconSize: [32, 37],
      iconSize: 20,
      checkedQuartiers: [],
      polygons: [],
      yourLatitude: 0,
      yourLongitude: 0
    };
  },
  beforeCreate() {
    navigator.geolocation.getCurrentPosition(position => {
      this.yourLatitude = position.coords.latitude;
      this.yourLongitude = position.coords.longitude;
    });
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&rows=65&facet=commune&facet=pole&facet=type&facet=automatique&facet=acces_pmr&refine.commune=Nantes&exclude.commune=Thouar%C3%A9-sur-Loire&exclude.commune=Carquefou&exclude.commune=Rez%C3%A9&exclude.commune=Le+Pellerin"
      )
      .then(response => {
        this.toilette = response.data.records;
      }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_gonfleurs-libre-service-nantes-metropole&rows=16&facet=commune&facet=conditions&refine.commune=Nantes"
        )
        .then(response => {
          this.gonfleur = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=512042839_composteurs-quartier-nantes-metropole&rows=191&facet=categorie&facet=lieu&facet=annee&exclude.lieu=Cou%C3%ABron&exclude.lieu=Bouguenais&exclude.lieu=Rez%C3%A9&exclude.lieu=Sautron&exclude.lieu=Le+Pellerin&exclude.lieu=Orvault&exclude.lieu=Saint-Sebastien-sur-Loire&exclude.lieu=La+Choli%C3%A8re"
        )
        .then(response => {
          this.composte = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_abris-velos-nantes-metropole&rows=83&facet=commune&facet=conditions&facet=gestionnaire&refine.commune=Nantes"
        )
        .then(response => {
          this.abris = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_wifi-public-nantes-metropole&facet=nom"
        )
        .then(response => {
          this.wifi = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_decheteries-ecopoints-nantes-metropole&rows=15&facet=libtype&facet=commune&facet=batteries&facet=bois&facet=carton&facet=gravats&facet=deee&facet=encombrants_menagers&facet=ferrailles&facet=huiles_moteur&facet=papiers_journaux_livres&facet=plastiques_menagers&facet=pneus&facet=textiles&facet=dechets_verts&facet=verre&facet=piles&facet=mobilier&facet=cartouches&facet=extincteur&facet=neons_lampes&facet=dechets_dangereux&facet=bouteilles_gaz"
        )
        .then(response => {
          this.decheteries = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_defibrillateurs-nantes&rows=158&sort=designation&facet=nature_site"
        )
        .then(response => {
          this.defibrillateur = response.data.records;
        }),
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_quartiers-nantes&rows=11&facet=nom"
        )
        .then(response => {
          this.polygons = response.data.records.map(record => {
            let reverseArray = record.fields.geometry.coordinates[0];
            return {
              coords: reverseArray.map(param => param.reverse()),
              show: false,
              fillColor: "tomato"
            };
          });
        });
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
    },
    showPolygon(index) {
      this.polygons[index].show = !this.polygons[index].show;
<<<<<<< HEAD
      const isEqual = (element) => element == index;  
      if(this.checkedQuartiers.includes(index)) {
        const toSplice = this.checkedQuartiers.findIndex(isEqual);
        this.checkedQuartiers.splice(toSplice, 1);
=======
      if (this.checkedQuartiers.includes(index)) {
        this.checkedQuartiers.splice(0, 1);
>>>>>>> 90bb83088c5cafbdc247d92da397b8f1ea78bfd8
      } else {
        this.checkedQuartiers.push(index);
      }
    },
    isInPolygon(point) {
      return inside(point, this.polygons[index].coords);
    },
    isIn(record, quartiers) {
      let result = quartiers.map(quartier => {
        return inside(record.fields.location, this.polygons[quartier].coords);
      });
      if (result.includes(true)){
        return true;
      } else {
        return false
      }
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
    LIcon,
    LPolygon
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.firstInput {
  align-items: center;
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 29px;
}
.secondInput {
  align-items: center;
  display: flex;
  list-style: none;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 29px;
  margin-bottom: 29px;
}

input {
  margin-right: 5px;
}

#defibrillateurButton {
  position: absolute;
  z-index: 999;
  bottom: 0px;
  right: 128px;
  background-color: rgb(30, 165, 30);
  padding: 6%;
  border-radius: 200px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#defibrillateurButton img {
  height: auto;
  width: 54px;
}

#defibrillateur {
  visibility: hidden;
  display: none;
}

#defibrillateurLabel {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 11px;
  font-weight: bold;
  color: white;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.youHere {
  height: 100%;
}
</style>
