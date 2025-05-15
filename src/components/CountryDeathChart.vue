<template>
  <div class="relative w-full h-full">
    <canvas ref="countryDeathChart"></canvas>
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
  limit: {
    type: Number,
    default: 10
  }
});

const countryDeathChart = ref(null);
let chart = null;

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

const createChart = () => {
  if (!hasData.value) return;
  
  const ctx = countryDeathChart.value.getContext('2d');
  
  // Filtrer les pays avec des données de décès
  const countriesWithDeaths = props.data.filter(country => country.total_deaths);
  
  // Limiter le nombre de pays à afficher pour éviter la surcharge visuelle
  // et regrouper les pays restants dans "Autres"
  const topCountries = [...countriesWithDeaths]
    .sort((a, b) => b.total_deaths - a.total_deaths)
    .slice(0, props.limit);
  
  // Calculer le total des décès pour les pays non affichés
  const othersTotal = countriesWithDeaths
    .sort((a, b) => b.total_deaths - a.total_deaths)
    .slice(props.limit)
    .reduce((sum, country) => sum + (country.total_deaths || 0), 0);
  
  // Préparer les données pour le graphique
  const labels = topCountries.map(item => item.country_region);
  const dataValues = topCountries.map(item => item.total_deaths || 0);
  
  
  // Générer des couleurs distinctes
  const backgroundColors = [
    'rgba(255, 99, 132, 0.8)',  // Rouge pour les décès
    'rgba(220, 53, 69, 0.8)',
    'rgba(248, 113, 113, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(185, 28, 28, 0.8)',
    'rgba(153, 27, 27, 0.8)',
    'rgba(127, 29, 29, 0.8)',
    'rgba(153, 27, 27, 0.7)',
    'rgba(220, 38, 38, 0.7)',
    'rgba(248, 113, 113, 0.7)',
    'rgba(107, 114, 128, 0.8)'  // Pour "Autres"
  ];
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'doughnut',  // Utiliser un graphique en anneau pour varier
    data: {
      labels: labels,
      datasets: [{
        label: 'Décès par pays',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        hoverOffset: 15,
        borderRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',  // Pour le doughnut chart
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)',
            padding: 15,
            font: {
              size: 11
            },
            // Limiter la longueur du texte des légendes
            generateLabels: function(chart) {
              const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
              const labels = original.call(this, chart);
              
              return labels.map(label => {
                const text = label.text;
                if (text.length > 15) {
                  label.text = text.substring(0, 15) + '...';
                }
                return label;
              });
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              const percentage = ((value / dataValues.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
              return `${label}: ${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

watch(() => props.data, createChart, { deep: true });
watch(() => props.limit, createChart);

onMounted(() => {
  if (hasData.value) {
    createChart();
  }
});
</script> 