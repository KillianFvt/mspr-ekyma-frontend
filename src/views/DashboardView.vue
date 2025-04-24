<template>
  <div class="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-700">
        <div class="flex items-center mb-4 sm:mb-0">
          <div class="bg-emerald-500 p-3 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">COVID-19 Dashboard</h1>
            <p class="text-slate-400">Données mondiales en temps réel</p>
          </div>
        </div>
        <div class="bg-slate-800 rounded-full px-4 py-2 text-sm font-medium text-slate-300 flex items-center">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Dernière mise à jour: {{ new Date().toLocaleDateString() }}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 p-6 group hover:scale-[1.02] transition-all duration-300">
          <div class="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m-13.5 0L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
          </div>
          <div class="flex flex-col justify-between h-full">
            <p class="text-blue-200 font-medium mb-1">Cas Confirmés</p>
            <div>
              <p class="text-4xl font-bold text-white mb-1">{{ formattedRatioCases }}</p>
              <p class="text-blue-200 text-sm">de la population mondiale</p>
            </div>
          </div>
        </div>
        
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-900 to-rose-700 p-6 group hover:scale-[1.02] transition-all duration-300">
          <div class="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="flex flex-col justify-between h-full">
            <p class="text-rose-200 font-medium mb-1">Décès</p>
            <div>
              <p class="text-4xl font-bold text-white mb-1">{{ formattedRatioDeaths }}</p>
              <p class="text-rose-200 text-sm">des cas confirmés</p>
            </div>
          </div>
        </div>
        
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-700 p-6 group hover:scale-[1.02] transition-all duration-300">
          <div class="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div class="flex flex-col justify-between h-full">
            <p class="text-emerald-200 font-medium mb-1">Guérisons</p>
            <div>
              <p class="text-4xl font-bold text-white mb-1">{{ formattedRatioRecovered }}</p>
              <p class="text-emerald-200 text-sm">des cas confirmés</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Nouveau graphique - Données par continent -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Répartition par continent
          </h2>
          <div class="flex items-center space-x-2">
            <select v-model="selectedMetricContinent" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="total_cases">Cas totaux</option>
              <option value="total_deaths">Décès</option>
              <option value="population">Population</option>
            </select>
          </div>
        </div>
        <div class="chart-container h-80">
          <ContinentChart :data="continentData" :metricKey="selectedMetricContinent" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800 rounded-xl p-5 shadow-lg h-full col-span-1">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cas par pays
            </h2>
            <div class="flex items-center">
              <select v-model="casesChartLimit" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2">
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
                <option value="15">Top 15</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <CountryPieChart :data="pieChartData" :limit="Number(casesChartLimit)" />
          </div>
        </div>

        <div class="bg-slate-800 rounded-xl p-5 shadow-lg h-full col-span-1">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Décès par pays
            </h2>
            <div class="flex items-center">
              <select v-model="deathChartLimit" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 mr-2">
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
                <option value="15">Top 15</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <CountryDeathChart :data="pieChartData" :limit="Number(deathChartLimit)" />
          </div>
        </div>

        <div class="bg-slate-800 rounded-xl p-5 shadow-lg h-full col-span-1">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Population et cas actifs
            </h2>
            <div class="flex items-center">
              <select v-model="activeCasesChartLimit" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2">
                <option value="5">Top 5</option>
                <option value="8">Top 8</option>
                <option value="10">Top 10</option>
              </select>
              <select v-model="activeCasesDisplayMode" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="bar">Barres horizontales</option>
                <option value="column">Barres verticales</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <ActiveCasesChart :data="fullCovidData" :limit="Number(activeCasesChartLimit)" :displayMode="activeCasesDisplayMode" />
          </div>
        </div>
      </div>

      <!-- Nouveau graphique - Relation Population vs Cas -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Relation Population vs Cas COVID
          </h2>
          <div class="flex items-center space-x-2">
            <select v-model="selectedTopCount" class="bg-slate-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="10">Top 10</option>
              <option value="20">Top 20</option>
              <option value="30">Top 30</option>
            </select>
          </div>
        </div>
        <div class="chart-container h-80">
          <ScatterChart :data="fullCovidData" :topCount="selectedTopCount" />
        </div>
      </div>

      <div class="bg-slate-800 rounded-xl p-6 shadow-lg mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Carte mondiale des cas COVID-19
          </h2>
          <div class="flex items-center space-x-2">
            <button 
              @click="mapView = 'continent'" 
              :class="[
                'text-sm py-1 px-3 rounded-md transition-colors', 
                mapView === 'continent' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              ]"
            >
              Par continent
            </button>
            <button 
              @click="mapView = 'country'" 
              :class="[
                'text-sm py-1 px-3 rounded-md transition-colors', 
                mapView === 'country' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              ]"
            >
              Par pays
            </button>
          </div>
        </div>
        <div class="map-container h-96 bg-slate-900 rounded-lg overflow-hidden relative">
          <CovidMap :data="fullCovidData" :view="mapView" v-if="fullCovidData.length > 0" />
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="relative w-16 h-16 mx-auto mb-3">
                <svg class="animate-ping absolute h-full w-full text-amber-600 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <svg class="relative h-full w-full text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p class="text-slate-400 text-sm">Chargement de la carte...</p>
            </div>
          </div>
        </div>
      </div>

      <footer class="text-center text-slate-500 text-sm py-6 border-t border-slate-800">
        <p>© 2025 MSPR 6.1 - Données actualisées automatiquement toutes les heures</p>
        <div class="flex justify-center mt-3 space-x-4">
          <a href="#" class="text-slate-400 hover:text-white transition-colors">À propos</a>
          <a href="#" class="text-slate-400 hover:text-white transition-colors">API</a>
          <a href="#" class="text-slate-400 hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import CountryPieChart from "../components/CountryPieChart.vue";
import CountryDeathChart from "../components/CountryDeathChart.vue";
import ActiveCasesChart from "../components/ActiveCasesChart.vue";
import ContinentChart from "../components/ContinentChart.vue";
import ScatterChart from "../components/ScatterChart.vue";
import CovidMap from "../components/CovidMap.vue";
import {API_URL} from "../constants.js";

const pieChartData = ref([]);
const squareData = ref({
  ratio_cases: '0.00%',
  ratio_deaths: '0.00%',
  ratio_recovered: '0.00%'
});
const fullCovidData = ref([]);
const continentData = ref([]);

const formattedRatioCases = computed(() => {
  if (!squareData.value || !squareData.value.ratio_cases) return '0.00%';
  
  try {
    const valueStr = squareData.value.ratio_cases.toString().replace('%', '').trim();
    const value = parseFloat(valueStr);
    return value.toFixed(2) + '%';
  } catch (e) {
    return squareData.value.ratio_cases;
  }
});

const formattedRatioDeaths = computed(() => {
  if (!squareData.value || !squareData.value.ratio_deaths) return '0.00%';
  
  try {
    const valueStr = squareData.value.ratio_deaths.toString().replace('%', '').trim();
    const value = parseFloat(valueStr);
    return value.toFixed(2) + '%';
  } catch (e) {
    return squareData.value.ratio_deaths;
  }
});

const formattedRatioRecovered = computed(() => {
  if (!squareData.value || !squareData.value.ratio_recovered) return '0.00%';
  
  try {
    const valueStr = squareData.value.ratio_recovered.toString().replace('%', '').trim();
    const value = parseFloat(valueStr);
    return value.toFixed(2) + '%';
  } catch (e) {
    return squareData.value.ratio_recovered;
  }
});

// Variables de contrôle pour les graphiques
const selectedMetricContinent = ref('total_cases');
const selectedTopCount = ref('20');
const casesChartLimit = ref('10');
const deathChartLimit = ref('10');
const activeCasesChartLimit = ref('8');
const activeCasesDisplayMode = ref('bar');
const mapView = ref('country');

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/api/covid-data/top-countries/?top=24`);
    console.log(response.url);
    
    if (!response.ok) {
      throw new Error('Erreur fetch');
    }

    const data = await response.json();
    console.log(data);
    pieChartData.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }

  try {
    const response = await fetch(`${API_URL}/api/covid-data/world-ratios`);
    console.log(response.url);
    
    if (!response.ok) {
      throw new Error('Erreur fetch');
    }

    const data = await response.json();
    console.log(data);

    squareData.value = {
      ratio_cases: processRatioValue(data.ratio_cases),
      ratio_deaths: processRatioValue(data.ratio_deaths),
      ratio_recovered: processRatioValue(data.ratio_recovered)
    };
    console.log(squareData.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }

  // Récupération de toutes les données COVID pour les nouveaux graphiques
  try {
    const response = await fetch(`${API_URL}/api/covid-data/`);
    
    if (!response.ok) {
      throw new Error('Erreur fetch');
    }

    const responseData = await response.json();
    const data = responseData.results;
    fullCovidData.value = data;
    
    // Traitement des données par continent
    const continents = {};
    data.forEach(item => {
      if (!item.continent) return;
      
      if (!continents[item.continent]) {
        continents[item.continent] = {
          name: item.continent,
          total_cases: 0,
          total_deaths: 0,
          population: 0,
          country_count: 0
        };
      }
      
      if (item.total_cases) continents[item.continent].total_cases += item.total_cases;
      if (item.total_deaths) continents[item.continent].total_deaths += item.total_deaths;
      if (item.population) continents[item.continent].population += item.population;
      continents[item.continent].country_count++;
    });
    
    continentData.value = Object.values(continents);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données complètes:', error);
  }
});

// Fonction utilitaire pour traiter les valeurs de ratio
function processRatioValue(value) {
  if (value === undefined || value === null) return '0.00%';

  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }
  
  // au cas où
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // bail uniquement pour les cas confirmés car bizarre un peu la data là
  if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
    return (numValue * 100).toFixed(2) + '%';
  }
  
  if (!isNaN(numValue)) {
    return numValue.toFixed(2) + '%';
  }
  
  return '0.00%';
}
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.map-container {
  animation: fadeIn 1s ease-in-out forwards;
  position: relative;
}

:deep(.leaflet-popup) {
  z-index: 1000;
}

:deep(.leaflet-control-zoom) {
  z-index: 1000;
}
</style>