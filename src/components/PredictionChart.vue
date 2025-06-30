<template>
  <div class="prediction-chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const createChart = () => {
  if (!chartCanvas.value || !props.data?.sequence_predictions) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const predictions = props.data.sequence_predictions
  
  const months = predictions.map(p => {
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    return monthNames[p.month_info.month - 1] || `Mois ${p.month_index}`
  })
  
  const predictedCases = predictions.map(p => Math.round(p.predicted_cases))
  const previousCases = predictions.map(p => Math.round(p.previous_month_cases))
  const casesTrend = predictions.map(p => Math.round(p.cases_trend))
  const trendPercentage = predictions.map(p => Math.round(p.trend_percentage * 100) / 100)

  const ctx = chartCanvas.value.getContext('2d')
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Cas prédits',
          data: predictedCases,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(16, 185, 129)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'Tendance (%)',
          data: trendPercentage,
          type: 'bar',
          backgroundColor: trendPercentage.map(val => 
            val > 0 ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)'
          ),
          borderColor: trendPercentage.map(val => 
            val > 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
          ),
          borderWidth: 1,
          yAxisID: 'y1',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Évolution des prédictions de cas',
          color: '#ffffff',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: '#e2e8f0',
            font: {
              size: 12
            },
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || ''
              const value = context.parsed.y
              
              if (label === 'Tendance (%)') {
                return `${label}: ${value > 0 ? '+' : ''}${value}%`
              } else {
                return `${label}: ${value.toLocaleString()} cas`
              }
            },
            afterBody: function(tooltipItems) {
              const monthIndex = tooltipItems[0].dataIndex
              const prediction = predictions[monthIndex]
              return [
                '',
                `Saison: ${prediction.month_info.season_name}`,
                `Température: ${prediction.weather_input.temperature_moyenne}°C`,
                `Précipitations: ${prediction.weather_input.precipitation_mm}mm`,
                `Humidité: ${prediction.weather_input.humidite_moyenne}%`,
                `Insolation: ${prediction.weather_input.insolation_hours}h`
              ]
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            callback: function(value) {
              return value.toLocaleString() + ' cas'
            }
          },
          title: {
            display: true,
            text: 'Nombre de cas',
            color: '#e2e8f0'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: 'rgba(148, 163, 184, 0.1)'
          },
          ticks: {
            color: '#94a3b8',
            callback: function(value) {
              return value + '%'
            }
          },
          title: {
            display: true,
            text: 'Tendance (%)',
            color: '#e2e8f0'
          }
        }
      },
      elements: {
        point: {
          hoverRadius: 8,
          hoverBorderWidth: 3
        }
      }
    }
  })
}

onMounted(() => {
  nextTick(() => {
    createChart()
  })
})

watch(() => props.data, () => {
  nextTick(() => {
    createChart()
  })
}, { deep: true })
</script>

<style scoped>
.prediction-chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
</style> 