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
  if (!chartCanvas.value || !props.data) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  let predictions, labels, predictedCases, additionalData

  if (props.data.predictions && Array.isArray(props.data.predictions)) {
    predictions = props.data.predictions
    
    labels = predictions.map(p => {
      const date = new Date(p.date)
      return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: 'short' 
      })
    })
    
    predictedCases = predictions.map(p => Math.round(p.prediction))
    
    additionalData = predictions.map(p => ({
      date: p.date,
      location: p.location,
      prediction: p.prediction
    }))
  } 
  else if (props.data.sequence_predictions && Array.isArray(props.data.sequence_predictions)) {
    predictions = props.data.sequence_predictions
    
    const months = predictions.map(p => {
      const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
      return monthNames[p.month_info.month - 1] || `Mois ${p.month_index}`
    })
    
    labels = months
    predictedCases = predictions.map(p => Math.round(p.predicted_cases))
    
    additionalData = predictions.map(p => ({
      season: p.month_info.season_name,
      temperature: p.weather_input.temperature_moyenne,
      precipitation: p.weather_input.precipitation_mm,
      humidity: p.weather_input.humidite_moyenne,
      insolation: p.weather_input.insolation_hours
    }))
  } else {
    return
  }

  const ctx = chartCanvas.value.getContext('2d')
  
  const datasets = [
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
    }
  ]

  if (props.data.sequence_predictions) {
    const trendPercentage = predictions.map(p => Math.round(p.trend_percentage * 100) / 100)
    datasets.push({
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
    })
  }
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
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
              const dataIndex = tooltipItems[0].dataIndex
              const additional = additionalData[dataIndex]
              
              if (props.data.predictions) {
                return [
                  '',
                  `Date: ${additional.date}`,
                  `Lieu: ${additional.location}`,
                  `Valeur exacte: ${additional.prediction.toFixed(2)}`
                ]
              } else {
                return [
                  '',
                  `Saison: ${additional.season}`,
                  `Température: ${additional.temperature}°C`,
                  `Précipitations: ${additional.precipitation}mm`,
                  `Humidité: ${additional.humidity}%`,
                  `Insolation: ${additional.insolation}h`
                ]
              }
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
        y1: props.data.sequence_predictions ? {
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
        } : undefined
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