<template>
  <div class="relative w-full h-full bg-slate-900/20 rounded-lg p-2">
    <canvas ref="chartCanvas"></canvas>
    <div v-if="errorMessage" class="absolute inset-0 flex items-center justify-center">
      <p class="text-rose-400 text-sm">{{ errorMessage }}</p>
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
    default: 8
  },
  displayMode: {
    type: String,
    default: 'bar'
  }
});

const chartCanvas = ref(null);
let chart = null;
const errorMessage = ref('');

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

const createChart = () => {
  try {
    errorMessage.value = '';
    
    if (!hasData.value) {
      errorMessage.value = 'Aucune donnée disponible';
      return;
    }
    
    if (!chartCanvas.value) {
      errorMessage.value = 'Élément canvas non disponible';
      return;
    }
    
    if (chart) {
      chart.destroy();
    }
    
    const ctx = chartCanvas.value.getContext('2d');
    
    console.log(props.data);
    
    const validData = props.data.filter(item => {
      return item && 
             item.country_region && 
             (typeof item.population !== 'undefined') && 
             ((typeof item.active_case !== 'undefined') || 
              (typeof item.active_cases !== 'undefined') || 
              (typeof item.total_cases !== 'undefined'));
    });
    
    if (validData.length === 0) {
      errorMessage.value = 'Aucune donnée valide pour le graphique';
      return;
    }
    
    const topCountries = [...validData]
      .sort((a, b) => {
        const aCases = a.active_case !== undefined ? a.active_case : 
                      (a.active_cases !== undefined ? a.active_cases : 
                       (a.total_cases || 0));
        const bCases = b.active_case !== undefined ? b.active_case : 
                      (b.active_cases !== undefined ? b.active_cases : 
                       (b.total_cases || 0));
        return bCases - aCases;
      })
      .slice(0, props.limit);
    
    const labels = topCountries.map(item => item.country_region);
    const casesData = topCountries.map(item => {
      return item.active_case !== undefined ? item.active_case : 
             (item.active_cases !== undefined ? item.active_cases : 
              (item.total_cases || 0));
    });
    const populationData = topCountries.map(item => item.population / 100);
    
    const isHorizontal = props.displayMode === 'bar';
    console.log("Mode d'affichage:", props.displayMode, "isHorizontal:", isHorizontal);
    
    const usesActiveCases = validData.some(item => typeof item.active_case !== 'undefined' || typeof item.active_cases !== 'undefined');
    const caseLabel = usesActiveCases ? 'Cas actifs' : 'Cas totaux';
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: caseLabel,
            data: casesData,
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1
          },
          {
            label: 'Population (x100)',
            data: populationData,
            backgroundColor: 'rgba(147, 51, 234, 0.7)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: isHorizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          y: {
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
            labels: {
              color: 'rgba(255, 255, 255, 0.9)'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw;
                
                if (label === 'Population (x100)') {
                  return `${label}: ${(value * 100).toLocaleString()}`;
                }
                
                return `${label}: ${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
    
    console.log("Graphique créé avec succès");
  } catch (error) {
    console.error("Erreur lors de la création du graphique:", error);
    errorMessage.value = `Erreur: ${error.message}`;
  }
};

watch(() => props.data, createChart, { deep: true });
watch(() => props.limit, createChart);
watch(() => props.displayMode, createChart);

onMounted(() => {
  setTimeout(() => {
    createChart();
  }, 100);
});
</script> 