<template>
  <div style="height: 500px; width: 100%">
    <h2> <span>1/</span> CHOISIS TON QUARTIER </h2>
      <ul>
        <li>
          <input type="checkbox" id="all" @click="showAll()" name="all" />
          <label for="all">Tous</label>
        </li>
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
    <div class="pointsInterets">
      <h2><span>2/</span> CHOISIS TON OU TES POINT(S) D'INTERET(S)</h2>
      <ul class="firstInput">
        <li>
          <input type="checkbox" id="toilette" class="inputItems" value="toilette" v-model="toiletteShow" />
          <label class="labelIcon" for="toilette"><img class="iconInputToilette" v-bind:class="{ activeToilette: isActiveToilette}" @click="handleIconToilette" src="../../public/Assets/toiletteCheck.png"/> Toilettes Public</label>
        </li>
        <li>
          <input type="checkbox" id="Gonfleur" class="inputItems" value="Gonfleur" v-model="gonfleurShow" />
          <label class="labelIcon" for="Gonfleur"><img class="iconInput" v-bind:class="{ activeGonfleur: isActiveGonfleur}" @click="handleIconGonfleur" src="../../public/Assets/gonfleurCheck.png"/>Gonfleur à velo <br> en libre service</label>
        </li>
        <li>
          <input type="checkbox" id="Abris-vélo" class="inputItems" value="Abris-vélo" v-model="abrisShow" />
          <label class="labelIcon" for="Abris-vélo"><img class="iconInput" v-bind:class="{ activeAbris: isActiveAbris}" @click="handleIconAbris" src="../../public/Assets/abrisCheck.png"/>Abris vélo</label>
        </li>
      </ul>
      <ul class="secondInput">
        <li>
          <input type="checkbox" id="Wifi" class="inputItems" value="Wifi" v-model="wifiShow" />
          <label class="labelIcon" for="Wifi"><img class="iconInput" v-bind:class="{ activeWifi: isActiveWifi}" @click="handleIconWifi" src="../../public/Assets/wifiCheck.png"/>Wifi Public</label>
        </li>
        <li>
          <input type="checkbox" id="Composteur" class="inputItems" value="Composteur" v-model="composteShow" />
          <label class="labelIcon" for="Composteur"><img class="iconInput" v-bind:class="{ activeComposte: isActiveComposte}" @click="handleIconComposte" src="../../public/Assets/composteCheck.png"/>Composteur de quartier</label>
        </li>
        <li>
          <input type="checkbox" id="decheterie" class="inputItems" value="decheterie" v-model="decheteriesShow" />
          <label class="labelIcon" for="decheterie"><img class="iconInput" v-bind:class="{ activeDecheterie: isActiveDecheterie}" @click="handleIconDecheterie" src="../../public/Assets/recyclerieCheck.png"/>Décheteries</label>
        </li>
      </ul>
    </div>

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
        v-if="record.geometry !== undefined && gonfleurShow === true && isInPolygon(record, checkedQuartiers)"
        id="gonfleur"
        v-for="record in gonfleur"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.adresse}}
          <br />
          {{record.fields.descriptif}}
          <br />
          {{record.fields.conditions}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/GonfleurVeloOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="record.geometry !== undefined && toiletteShow === true && isInPolygon(record, checkedQuartiers)"
        id="toilette"
        v-for="record in toilette"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.adresse}}
          <br />
          Accès PMR : {{record.fields.acces_pmr}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+ record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/ToilettesGrand.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="record.geometry !== undefined && composteShow === true && isInPolygon(record, checkedQuartiers)"
        id="composte"
        v-for="record in composte"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.adresse}}
          <br />
          {{record.fields.categorie}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/ComposteursOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="record.geometry !== undefined && abrisShow === true && isInPolygon(record, checkedQuartiers)"
        id="abris"
        v-for="record in abris"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.adresse}}
          <br />
          {{record.fields.descriptif}}
          <br />
          {{record.fields.conditions}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/abrisVeloOK.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-if="record.geometry !== undefined && wifiShow === true && isInPolygon(record, checkedQuartiers)"
        id="wifi"
        v-for="record in wifi"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/Wifi.png" />
        </l-icon>
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.nom_reseau}}
          <br />
          {{record.fields.adresse}}
          <br />
          <a :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse">Itinéraire</a>
        </l-popup>
        </LMarker>
      <LMarker
        v-if="record.geometry !== undefined && decheteriesShow === true && isInPolygon(record, checkedQuartiers)"
        id="decheterie"
        v-for="record in decheteries"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.nom_complet}}
          <br />
          {{record.fields.adresse}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
        <l-icon :icon-anchor="staticAnchor">
          <img src="../../public/Assets/recyclerieGrand.png" />
        </l-icon>
      </LMarker>
      <LMarker
        v-for="record in defibrillateur"
        v-if="record.geometry !== undefined && defibrillateurShow === true "
        id="defibrillateur"
        :show="false"
        :key="record.recordid"
        :lat-lng="[record.geometry.coordinates[1], record.geometry.coordinates[0]]"
      >
        <l-popup :options="{ autoClose: true, closeOnClick: true }">
          {{record.fields.designation}}
          <br />
          {{record.fields.adresse}}
          <br />
          {{record.fields.jours_ouverture}}
          <br />
          Heure ouverture : {{record.fields.heur_ouverture}} Heure fermeture : {{record.fields.heure_fermeture}}
          <br />
          Position : {{record.fields.position_precise}}
          <br />
          <a
            :href="'https://www.google.com/maps/dir/?api=1&origin=' + yourLatitude +','+ yourLongitude +'&destination='+record.fields.adresse"
          >Itinéraire</a>
        </l-popup>
      </LMarker>
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
        @click="showDef()"
      />
      <label for="defibrillateur" id="defibrillateurLabel">
        <img src="../../public/Assets/defibrillatorWhite.png" /> Défibrillateurs
      </label>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPolygon,
  LPopup
} from "vue2-leaflet";
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
Vue.component("l-popup", LPopup);

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
      isActiveToilette : true,
      isActiveGonfleur : true,
      isActiveWifi : true,
      isActiveAbris : true,
      isActiveComposte : true,
      isActiveDecheterie : true,
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
      staticAnchor: [25, 5],
      iconSize: [16, 37],
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
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_defibrillateurs-nantes&rows=158&sort=designation&facet=nature_site/"
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
              fillColor: "#F18C00",
            };
          });
        });
  },
  methods: {
    showDef() {
      this.defibrillateurShow = !this.defibrillateurShow;
    },
    handleIconToilette(){
      this.isActiveToilette = !this.isActiveToilette
    },
    handleIconGonfleur(){
      this.isActiveGonfleur = !this.isActiveGonfleur
    },
    handleIconAbris(){
      this.isActiveAbris = !this.isActiveAbris
    },
    handleIconWifi(){
      this.isActiveWifi = !this.isActiveWifi
    },
    handleIconComposte(){
      this.isActiveComposte = !this.isActiveComposte
    },
    handleIconDecheterie(){
      this.isActiveDecheterie = !this.isActiveDecheterie
    },

    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    showAll() {
      if (this.checkedQuartiers.length < 1) {
        this.checkedQuartiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let i=0; i < this.polygons.length; i++){
          this.polygons[i].show = !this.polygons[i].show;
        };
      } else {
        this.checkedQuartiers = [];
        for (let i=0; i < this.polygons.length; i++){
          this.polygons[i].show = !this.polygons[i].show;
        };
      }
    },
    showPolygon(index) {
      this.polygons[index].show = !this.polygons[index].show;
      const isEqual = element => element == index;
      if (this.checkedQuartiers.includes(index)) {
        const toSplice = this.checkedQuartiers.findIndex(isEqual);
        this.checkedQuartiers.splice(toSplice, 1);
      } else {
        this.checkedQuartiers.push(index);

      }
    },
    isInPolygon(record, quartiers) {
      let result = quartiers.map(quartier => {
        return inside(record.fields.location, this.polygons[quartier].coords);
      });
      if (result.includes(true)) {
        return true;
      } else {
        return false;
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
  position: fixed;
  z-index: 999;
  bottom: 40px;
  right: 40px;
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
  height: 100px;
}

.labelIcon{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.iconInput{
  height: auto;
  width: 40px;
}
.iconInputToilette{
  height: auto;
  width: 40px;
}
.activeToilette{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}
.activeGonfleur{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}
.activeAbris{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}
.activeWifi{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}
.activeComposte{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}
.activeDecheterie{
  height: auto;
  width: 40px;
  filter: grayscale(1);
}

.inputItems{
  display: none;
}

h2{
  margin-top: 15px;
  margin-bottom: 15px;
}
h2 span{
  color: #F18C00;
}
.pointsInterets{
  background-color: rgb(240, 240, 240);
  padding: 6%;
  margin-top: 20px;
}

ul li{
  margin-bottom: 7px;
}
</style>
