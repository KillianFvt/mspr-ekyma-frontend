<template>
  <div class="relative w-full h-full">
    <canvas ref="scatterChart"></canvas>
    <div v-if="!hasData" class="absolute inset-0 flex items-center justify-center">
      <p class="text-slate-400">Aucune donnée disponible</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, defineProps } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  topCount: {
    type: [String, Number],
    default: 20
  }
});

const scatterChart = ref(null);
let chart = null;

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

// Préparation des données pour le scatter plot
const getScatterData = () => {
  if (!hasData.value) return [];
  
  // Filtrer les pays qui ont à la fois des données de population et de cas
  const validData = props.data.filter(
    item => item.population && item.total_cases && item.country_region
  );
  
  // Trier par nombre de cas (descendant)
  const sortedData = [...validData].sort((a, b) => b.total_cases - a.total_cases);
  
  // Prendre les N premiers pays selon topCount
  const topData = sortedData.slice(0, Number(props.topCount));
  
  // Convertir en format pour graphique scatter
  return topData.map(item => ({
    x: item.population,
    y: item.total_cases,
    label: item.country_region
  }));
};

const createChart = () => {
  if (!hasData.value) return;
  
  const ctx = scatterChart.value.getContext('2d');
  const scatterData = getScatterData();
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Population vs Cas COVID',
        data: scatterData,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Nombre de cas',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Population',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.raw;
              return `${point.label}: ${point.y.toLocaleString()} cas (population: ${point.x.toLocaleString()})`;
            }
          }
        },
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }
      }
    }
  });
};

watch(() => props.data, createChart, { deep: true });
watch(() => props.topCount, createChart);

onMounted(() => {
  if (hasData.value) {
    createChart();
  }
});
</script> 