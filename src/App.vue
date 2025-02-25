<template>
  <h1>MSPR 6.1 Dashboard</h1>

  <div>
    <h1>Dashboard des ventes</h1>
    <BarChart :data="sampleData" />
  </div>

  <div>
    <h1>Dashboard des morts</h1>
    <DeathChart :data="sampleData" />
  </div>

  <div>
    <h1>Dashboard des populations</h1>
    <PopChart :data="sampleData" />
  </div>

  <div class="map-page">
    <h1>Carte des cas COVID-19 par continent</h1>
    <CovidMap />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<script setup>
import BarChart from "./components/BarChart.vue";
import DeathChart from "./components/DeathChart.vue";
import PopChart from "./components/PopChart.vue";
import CovidMap from './components/CovidMap.vue'

const sampleData = [
  { country_region: "France", total_cases: 10, total_death : 2, population: 67 , active_case: 12},
  { country_region: "USA", total_cases: 15, total_death : 4, population: 33 , active_case: 5 },
  { country_region: "Spain", total_cases: 8 , total_death : 10, population: 59 , active_case: 43  },
  { country_region: "Italy", total_cases: 20, total_death : 6, population: 78 , active_case: 23  },
  { country_region: "Iraq", total_cases: 18, total_death : 7, population: 12 , active_case: 3  },
  { country_region: "Walse", total_cases: 25, total_death : 29, population: 76 , active_case: 100  }
];
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
