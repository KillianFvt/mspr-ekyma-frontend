<template>
  <div class="w-full h-full relative">
    <div id="covid-map" class="w-full h-full rounded-lg overflow-hidden"></div>
    
    <div class="absolute bottom-4 right-4 bg-slate-900 p-3 rounded-lg text-white text-xs z-[1000] shadow-lg border border-slate-700">
      <div class="font-semibold mb-2">Cas COVID-19</div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex items-center">
          <span class="inline-block w-4 h-4 bg-emerald-400 mr-2 rounded-sm"></span>
          <span>&lt; 100K</span>
        </div>
        <div class="flex items-center">
          <span class="inline-block w-4 h-4 bg-yellow-400 mr-2 rounded-sm"></span>
          <span>100K - 500K</span>
        </div>
        <div class="flex items-center">
          <span class="inline-block w-4 h-4 bg-orange-500 mr-2 rounded-sm"></span>
          <span>500K - 1M</span>
        </div>
        <div class="flex items-center">
          <span class="inline-block w-4 h-4 bg-red-600 mr-2 rounded-sm"></span>
          <span>&gt; 1M</span>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-[900]">
      <div class="text-white text-center">
        <svg class="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Chargement de la carte...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, onBeforeUnmount, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import worldGeoJSON from '../assets/world.geo.json';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  view: {
    type: String,
    default: 'country',
  }
});

let map = null;
let geojsonLayer = null;
let continentLayers = {}; // Pour stocker les couches par continent
const isLoading = ref(true);

// Données agrégées par continent
const continentData = computed(() => {
  const continents = {};
  
  props.data.forEach(item => {
    if (!item.continent) return;
    
    if (!continents[item.continent]) {
      continents[item.continent] = {
        name: item.continent,
        total_cases: 0,
        total_deaths: 0,
        population: 0,
        country_count: 0,
        countries: []
      };
    }
    
    if (item.total_cases) continents[item.continent].total_cases += item.total_cases;
    if (item.total_deaths) continents[item.continent].total_deaths += item.total_deaths;
    if (item.population) continents[item.continent].population += item.population;
    continents[item.continent].country_count++;
    continents[item.continent].countries.push(item.country_region);
  });
  
  return continents;
});

const getColor = (cases) => {
  if (!cases) return '#6B7280';
  
  return cases > 1000000 ? '#DC2626' : // fraise
         cases > 500000 ? '#EA580C' :  // orange
         cases > 100000 ? '#FBBF24' :  // banane
                         '#10B981';    // pomme (verte)
};

const styleFunction = (feature) => {
  const countryName = feature.properties.name;
  const countryData = props.data.find(d => 
    d.country_region?.toLowerCase() === countryName.toLowerCase() ||
    d.country_region?.toLowerCase().includes(countryName.toLowerCase()) ||
    countryName.toLowerCase().includes(d.country_region?.toLowerCase())
  );
  
  return {
    fillColor: getColor(countryData?.total_cases),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '1',
    fillOpacity: 0.7
  };
};

const formatNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  return new Intl.NumberFormat('fr-FR').format(num);
};

const onEachFeature = (feature, layer) => {
  const countryName = feature.properties.name;
  const countryData = props.data.find(d => 
    d.country_region?.toLowerCase() === countryName.toLowerCase() ||
    d.country_region?.toLowerCase().includes(countryName.toLowerCase()) ||
    countryName.toLowerCase().includes(d.country_region?.toLowerCase())
  );
  
  if (countryData) {
    const continent = countryData.continent;
    
    if (continent && props.view === 'continent') {
      if (!continentLayers[continent]) {
        continentLayers[continent] = [];
      }
      continentLayers[continent].push(layer);
      
      const continentInfo = continentData.value[continent];
      if (continentInfo) {
        layer.bindPopup(`
          <div class="map-popup">
            <h3>${continentInfo.name}</h3>
            <table>
              <tr>
                <td>Cas:</td>
                <td><strong>${formatNumber(continentInfo.total_cases)}</strong></td>
              </tr>
              <tr>
                <td>Décès:</td>
                <td><strong>${formatNumber(continentInfo.total_deaths)}</strong></td>
              </tr>
              <tr>
                <td>Population:</td>
                <td><strong>${formatNumber(continentInfo.population)}</strong></td>
              </tr>
              <tr>
                <td>Pays:</td>
                <td><strong>${formatNumber(continentInfo.country_count)}</strong></td>
              </tr>
            </table>
          </div>
        `);
      }
      
      layer.on({
        mouseover: function() {
          if (props.view === 'continent' && continentLayers[continent]) {
            continentLayers[continent].forEach(countryLayer => {
              countryLayer.setStyle({
                weight: 2,
                color: '#ffffff',
                dashArray: '',
                fillOpacity: 0.9
              });
              if (countryLayer.bringToFront) {
                countryLayer.bringToFront();
              }
            });
          }
        },
        mouseout: function() {
          if (props.view === 'continent' && geojsonLayer) {
            geojsonLayer.resetStyle(layer);
            if (continentLayers[continent]) {
              continentLayers[continent].forEach(countryLayer => {
                geojsonLayer.resetStyle(countryLayer);
              });
            }
          }
        }
      });
    } else {
      layer.bindPopup(`
        <div class="map-popup">
          <h3>${countryData.country_region}</h3>
          <table>
            <tr>
              <td>Cas:</td>
              <td><strong>${formatNumber(countryData.total_cases)}</strong></td>
            </tr>
            <tr>
              <td>Décès:</td>
              <td><strong>${formatNumber(countryData.total_deaths)}</strong></td>
            </tr>
            <tr>
              <td>Population:</td>
              <td><strong>${formatNumber(countryData.population)}</strong></td>
            </tr>
          </table>
        </div>
      `);
      
      layer.on({
        mouseover: function(e) {
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            color: '#ffffff',
            dashArray: '',
            fillOpacity: 0.9
          });
          layer.bringToFront();
        },
        mouseout: function(e) {
          geojsonLayer.resetStyle(e.target);
        }
      });
    }
  }
};

const initMap = () => {
  isLoading.value = true;
  
  if (map) {
    map.remove();
  }

  try {
    map = L.map('covid-map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: false
    });
    
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    if (props.data && props.data.length > 0) {
      continentLayers = {};
      
      geojsonLayer = L.geoJSON(worldGeoJSON, {
        style: styleFunction,
        onEachFeature: onEachFeature
      }).addTo(map);
    }
    
    if (props.view === 'continent') {
      map.setZoom(1);
    } else {
      map.setZoom(2);
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la carte:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.data, () => {
  if (props.data && props.data.length > 0 && map) {
    isLoading.value = true;
    
    try {
      if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
      }
      
      continentLayers = {};
      
      geojsonLayer = L.geoJSON(worldGeoJSON, {
        style: styleFunction,
        onEachFeature: onEachFeature
      }).addTo(map);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte:', error);
    } finally {
      isLoading.value = false;
    }
  }
}, { deep: true });

watch(() => props.view, () => {
  if (map) {
    try {
      if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
      }
      
      continentLayers = {};
      
      geojsonLayer = L.geoJSON(worldGeoJSON, {
        style: styleFunction,
        onEachFeature: onEachFeature
      }).addTo(map);
      
      if (props.view === 'continent') {
        map.setZoom(1);
      } else {
        map.setZoom(2);
      }
    } catch (error) {
      console.error('Erreur lors du changement de vue:', error);
    }
  }
});

onMounted(() => {
  setTimeout(() => {
    initMap();
  }, 100);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style>
.leaflet-container {
  background-color: #1E293B;
}

.leaflet-popup-content-wrapper {
  background-color: #1E293B;
  color: white;
  border-radius: 8px;
}

.leaflet-popup-tip {
  background-color: #1E293B;
}

.map-popup h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 3px;
}

.map-popup table {
  font-size: 12px;
  border-collapse: separate;
  border-spacing: 3px;
}

.map-popup td {
  padding: 2px 0;
}
</style>