<template>
  <div class="relative w-full h-full">
    <canvas ref="continentChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  metricKey: {
    type: String,
    default: 'total_cases'
  }
});

const continentChart = ref(null);
let chart = null;

// Palette de couleurs pour les différents continents
const continentColors = {
  'Asia': 'rgba(54, 162, 235, 0.8)',
  'Europe': 'rgba(255, 99, 132, 0.8)',
  'North America': 'rgba(75, 192, 192, 0.8)',
  'South America': 'rgba(255, 206, 86, 0.8)',
  'Africa': 'rgba(153, 102, 255, 0.8)',
  'Oceania': 'rgba(255, 159, 64, 0.8)',
  'Antarctica': 'rgba(199, 199, 199, 0.8)'
};

// Titres pour les différentes métriques
const metricTitles = {
  'total_cases': 'Nombre total de cas par continent',
  'total_deaths': 'Nombre total de décès par continent', 
  'population': 'Population par continent'
};

const createChart = () => {
  if (!props.data || props.data.length === 0) return;
  
  const ctx = continentChart.value.getContext('2d');
  
  // Préparer les données pour le graphique
  const labels = props.data.map(item => item.name);
  const dataValues = props.data.map(item => item[props.metricKey] || 0);
  const backgroundColors = props.data.map(item => continentColors[item.name] || 'rgba(128, 128, 128, 0.8)');
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: metricTitles[props.metricKey] || props.metricKey,
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                const value = context.parsed.y;
                // Formater les grands nombres avec des séparateurs de milliers
                label += new Intl.NumberFormat().format(value);
              }
              return label;
            }
          }
        }
      }
    }
  });
};

watch(() => props.data, createChart, { deep: true });
watch(() => props.metricKey, createChart);

onMounted(() => {
  if (props.data && props.data.length > 0) {
    createChart();
  }
});
</script> 