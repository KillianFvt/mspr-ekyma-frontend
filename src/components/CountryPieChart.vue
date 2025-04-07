<template>
  <div class="relative w-full h-full">
    <canvas ref="countryPieChart"></canvas>
    <div v-if="!hasData" class="absolute inset-0 flex items-center justify-center">
      <p class="text-slate-400">Aucune donnée disponible</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
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

const countryPieChart = ref(null);
let chart = null;

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

const createChart = () => {
  if (!hasData.value) return;
  
  const ctx = countryPieChart.value.getContext('2d');
  
  // Limiter le nombre de pays à afficher pour éviter la surcharge visuelle
  // et regrouper les pays restants dans "Autres"
  const topCountries = [...props.data]
    .sort((a, b) => b.total_cases - a.total_cases)
    .slice(0, props.limit);
  
  // Calculer le total des cas pour les pays non affichés
  const othersTotal = props.data
    .sort((a, b) => b.total_cases - a.total_cases)
    .slice(props.limit)
    .reduce((sum, country) => sum + (country.total_cases || 0), 0);
  
  // Préparer les données pour le graphique
  const labels = topCountries.map(item => item.country_region);
  const dataValues = topCountries.map(item => item.total_cases || 0);
  
  // Ajouter la catégorie "Autres" si nécessaire
  if (othersTotal > 0 && props.data.length > props.limit) {
    labels.push('Autres');
    dataValues.push(othersTotal);
  }
  
  // Générer des couleurs distinctes
  const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(217, 119, 6, 0.8)',
    'rgba(107, 114, 128, 0.8)'  // Pour "Autres"
  ];
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cas par pays',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
        hoverOffset: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
              const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const labels = original.call(this, chart);
              
              return labels.map(label => {
                const text = label.text;
                // Couper le texte si trop long et ajouter des points de suspension
                if (text.length > 15) {
                  label.text = text.substring(0, 15) + '...';
                }
                return label;
              });
            }
          },
          onClick: function(e, legendItem, legend) {
            // Implémenter un comportement personnalisé si nécessaire
            const index = legendItem.index;
            const meta = legend.chart.getDatasetMeta(0);
            
            // Basculer la visibilité du segment
            meta.data[index].hidden = !meta.data[index].hidden;
            
            // Mettre à jour le graphique
            legend.chart.update();
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

onMounted(() => {
  if (hasData.value) {
    createChart();
  }
});
</script> 