<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">📊 MSPR 6.1 Dashboard</h1>
      
      <div class="w-full mt-6">
        <DashboardCard title="Ratios COVID-19">
          <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded shadow">
              <p class="text-lg font-semibold">Ratio des cas</p>
              <p class="text-2xl">{{ squareData.ratio_cases }}</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <p class="text-lg font-semibold">Ratio des décès</p>
              <p class="text-2xl">{{ squareData.ratio_deaths }}</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <p class="text-lg font-semibold">Ratio des récupérations</p>
              <p class="text-2xl">{{ squareData.ratio_recovered }}</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div class="w-full flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <DashboardCard title="Dashboard des ventes">
            <PieChart :data="pieChartData" />
          </DashboardCard>
        </div>
        <div class="w-full md:w-1/2">
          <DashboardCard title="Dashboard des morts">
            <DeathChart :data="pieChartData" />
          </DashboardCard>
        </div>
      </div>
      
      <div class="w-full mt-6">
        <DashboardCard title="Dashboard des populations">
          <PopChart :data="sampleData" />
        </DashboardCard>
      </div>

      <div class="map-page">
        <h1>Carte des cas COVID-19 par continent</h1>
        <!-- <CovidMap /> -->
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PieChart from "@/components/PieChart.vue";
import DeathChart from "@/components/DeathChart.vue";
import PopChart from "@/components/PopChart.vue";
import DashboardCard from "@/components/DashboardCard.vue";
// import CovidMap from '@/components/CovidMap.vue'

const pieChartData = ref([]);
const squareData = ref({});

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/covid-data/top-countries/?top=24");
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
    const response = await fetch("http://127.0.0.1:8000/api/covid-data/world-ratios");
    console.log(response.url);
    
    if (!response.ok) {
      throw new Error('Erreur fetch');
    }

    const data = await response.json();
    console.log(data);
    squareData.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});

const sampleData = [
  { country_region: "France", total_cases: 10, total_death: 2, population: 67, active_case: 12 },
  { country_region: "USA", total_cases: 15, total_death: 4, population: 33, active_case: 5 },
  { country_region: "Spain", total_cases: 8, total_death: 10, population: 59, active_case: 43 },
  { country_region: "Italy", total_cases: 20, total_death: 6, population: 78, active_case: 23 },
  { country_region: "Iraq", total_cases: 18, total_death: 7, population: 12, active_case: 3 },
  { country_region: "Wales", total_cases: 25, total_death: 29, population: 76, active_case: 100 }
];
</script>

<style scoped>
</style>