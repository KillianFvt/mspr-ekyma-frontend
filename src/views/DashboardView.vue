<template>
  <div class="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-700">
        <div class="flex items-center mb-4 sm:mb-0">
          <div class="bg-emerald-500 p-3 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">{{ t('upload.title') }}</h1>
            <p class="text-slate-400">{{ t('upload.subtitle') }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <LanguageSelector />
          <div class="bg-slate-800 rounded-full px-4 py-2 text-sm font-medium text-slate-300 flex items-center">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {{ t('upload.ready') }}
          </div>
        </div>
      </div>

      <div class="bg-slate-800 rounded-xl p-8 shadow-lg mb-8">
        <div class="text-center mb-8">
          <div class="bg-gradient-to-br from-blue-900 to-blue-700 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ t('upload.formTitle') }}</h2>
          <p class="text-slate-400">{{ t('upload.formSubtitle') }}</p>
        </div>

        <div class="relative">
          <div 
            @drop.prevent="handleDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            :class="[
              'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer',
              dragOver 
                ? 'border-emerald-500 bg-emerald-500/10' 
                : selectedFile 
                  ? 'border-emerald-500 bg-emerald-500/5'
                  : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'
            ]"
            @click="$refs.fileInput.click()"
          >
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileSelect" 
              accept=".csv"
              class="hidden"
            >
            
            <div v-if="!selectedFile">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-lg font-medium text-white mb-2">{{ t('upload.dropZone') }}</p>
              <p class="text-slate-400 mb-4">{{ t('upload.or') }}</p>
              <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                {{ t('upload.browse') }}
              </button>
              <p class="text-sm text-slate-500 mt-4">{{ t('upload.formats') }}</p>
            </div>
            
            <div v-else class="flex items-center justify-center space-x-4">
              <div class="bg-emerald-500 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-lg font-medium text-white">{{ selectedFile.name }}</p>
                <p class="text-emerald-400 text-sm">{{ formatFileSize(selectedFile.size) }} • {{ t('upload.ready') }}</p>
              </div>
              <button 
                @click.stop="removeFile"
                class="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="selectedFile" class="mt-8 space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div class="bg-slate-700 rounded-lg p-6 max-w-md mx-auto">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ t('upload.csvConfig') }}
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">{{ t('upload.delimiter') }}</label>
                  <select v-model="csvDelimiter" class="w-full bg-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value=",">,</option>
                    <option value=";">;</option>
                    <option value="|">|</option>
                    <option value="\t">Tab</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="hasHeaders" 
                    v-model="hasHeaders"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-600"
                  >
                  <label for="hasHeaders" class="ml-2 text-sm text-slate-300">{{ t('upload.hasHeaders') }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center pt-6">
            <button 
              @click="processFile"
              :disabled="!selectedFile || isProcessing"
              :class="[
                'px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2',
                !selectedFile || isProcessing
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              ]"
            >
              <svg v-if="!isProcessing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m100 50c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-74.2 2.9l22.7-22.7c1.4-1.4 3.6-1.4 5 0s1.4 3.6 0 5l-22.7 22.7c-1.4 1.4-3.6 1.4-5 0s-1.4-3.6 0-5z"></path>
              </svg>
              <span>{{ isProcessing ? t('upload.processing') : t('upload.process') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="apiResponse && apiResponse.success" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 text-white">
            <div class="flex items-center mb-3">
              <div class="bg-purple-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('upload.modelInfo') }}</h3>
            </div>
            <p class="text-purple-200 text-sm mb-2">{{ apiResponse.model_info.model_name }}</p>
            <p class="text-purple-100 text-xs">{{ apiResponse.model_info.model_type }}</p>
            <div class="mt-3 flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              <span class="text-purple-200 text-xs">{{ apiResponse.model_info.status }}</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white">
            <div class="flex items-center mb-3">
              <div class="bg-blue-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('upload.summary') }}</h3>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">{{ t('upload.totalMonths') }}:</span>
                <span class="text-white font-medium">{{ apiResponse.summary.total_months }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">{{ t('upload.averageCases') }}:</span>
                <span class="text-white font-medium">{{ Math.round(apiResponse.summary.average_monthly_cases).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">{{ t('upload.trend') }}:</span>
                <span class="text-white font-medium">{{ apiResponse.summary.overall_trend }}</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-xl p-6 text-white">
            <div class="flex items-center mb-3">
              <div class="bg-emerald-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('upload.peakAnalysis') }}</h3>
            </div>
            <div class="space-y-2">
              <div>
                <span class="text-emerald-200 text-sm block">{{ t('upload.peakCases') }}:</span>
                <span class="text-white font-bold text-lg">{{ Math.round(apiResponse.summary.peak_cases).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-emerald-200 text-sm">{{ t('upload.peakMonth') }}:</span>
                <span class="text-white font-medium">{{ t('upload.month') }} {{ apiResponse.summary.peak_month }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-emerald-200 text-sm">{{ t('upload.lowestCases') }}:</span>
                <span class="text-white font-medium">{{ Math.round(apiResponse.summary.lowest_cases).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-800 rounded-xl p-6 shadow-lg">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{ t('upload.predictionChart') }}
            </h2>
            <div class="text-sm text-slate-400">
              {{ apiResponse.message }}
            </div>
          </div>
          <PredictionChart :data="apiResponse" />
        </div>

        <div class="bg-slate-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            {{ t('upload.detailedPredictions') }}
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-700">
                  <th class="text-left py-3 px-2 text-slate-300 font-medium">{{ t('upload.month') }}</th>
                  <th class="text-left py-3 px-2 text-slate-300 font-medium">{{ t('upload.season') }}</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">{{ t('upload.predictedCases') }}</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">{{ t('upload.trend') }}</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">{{ t('upload.temperature') }}</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">{{ t('upload.precipitation') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prediction in apiResponse.sequence_predictions" :key="prediction.month_index" class="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td class="py-3 px-2 text-white font-medium">
                    {{ ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][prediction.month_info.month - 1] }}
                  </td>
                  <td class="py-3 px-2 text-slate-300">{{ prediction.month_info.season_name }}</td>
                  <td class="py-3 px-2 text-right text-white font-medium">{{ Math.round(prediction.predicted_cases).toLocaleString() }}</td>
                  <td class="py-3 px-2 text-right">
                    <span :class="[
                      'px-2 py-1 rounded text-xs font-medium',
                      prediction.trend_percentage > 0 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : prediction.trend_percentage < 0
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-slate-500/20 text-slate-400'
                    ]">
                      {{ prediction.trend_percentage > 0 ? '+' : '' }}{{ Math.round(prediction.trend_percentage * 100) / 100 }}%
                    </span>
                  </td>
                  <td class="py-3 px-2 text-right text-slate-300">{{ prediction.weather_input.temperature_moyenne }}°C</td>
                  <td class="py-3 px-2 text-right text-slate-300">{{ prediction.weather_input.precipitation_mm }}mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else-if="apiResponse && !apiResponse.success" class="bg-slate-800 rounded-xl p-6 shadow-lg border border-red-500/20">
        <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ t('upload.error') }}
        </h2>
        <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <pre class="text-red-300 text-sm overflow-auto">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import LanguageSelector from '../components/LanguageSelector.vue'
import PredictionChart from '../components/PredictionChart.vue'

const { t } = useI18n()

const selectedFile = ref(null)
const dragOver = ref(false)

const csvDelimiter = ref(',')
const hasHeaders = ref(true)

const isProcessing = ref(false)
const apiResponse = ref(null)

const handleDrop = (e) => {
  dragOver.value = false
  const files = e.dataTransfer.files
  if (files.length > 0 && files[0].type === 'text/csv') {
    selectedFile.value = files[0]
  }
}

const handleFileSelect = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    selectedFile.value = files[0]
  }
}

const removeFile = () => {
  selectedFile.value = null
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const processFile = async () => {
  if (!selectedFile.value) return
  
  isProcessing.value = true
  
  try {
    // TODO: Implement CSV to JSON conversion and API call
    console.log('Processing file:', selectedFile.value.name)
    console.log('CSV Delimiter:', csvDelimiter.value)
    console.log('Has Headers:', hasHeaders.value)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    apiResponse.value = {"success":true,"sequence_predictions":[{"month_index":1,"month_info":{"month":1,"season":1,"season_name":"Erreur","quarter":1},"weather_input":{"precipitation_mm":80,"humidite_moyenne":75,"insolation_hours":3,"temperature_moyenne":5,"month":1,"season":1},"predicted_cases":1120.4362383866278,"cases_trend":0.0,"trend_percentage":0.0,"previous_month_cases":1106.1250138860482,"error":"Erreur de prédiction: X has 54 features, but StandardScaler is expecting 51 features as input."},{"month_index":2,"month_info":{"month":2,"season":1,"season_name":"Erreur","quarter":1},"weather_input":{"precipitation_mm":65,"humidite_moyenne":70,"insolation_hours":5,"temperature_moyenne":8,"month":2,"season":1},"predicted_cases":1209.1554230837246,"cases_trend":0.0,"trend_percentage":0.0,"previous_month_cases":1120.4362383866278,"error":"Erreur de prédiction: X has 54 features, but StandardScaler is expecting 51 features as input."},{"month_index":3,"month_info":{"month":3,"season":2,"season_name":"Erreur","quarter":1},"weather_input":{"precipitation_mm":45,"humidite_moyenne":65,"insolation_hours":7,"temperature_moyenne":14,"month":3,"season":2},"predicted_cases":1183.900766972473,"cases_trend":0.0,"trend_percentage":0.0,"previous_month_cases":1209.1554230837246,"error":"Erreur de prédiction: X has 54 features, but StandardScaler is expecting 51 features as input."},{"month_index":4,"month_info":{"month":4,"season":2,"season_name":"Erreur","quarter":1},"weather_input":{"precipitation_mm":35,"humidite_moyenne":60,"insolation_hours":9,"temperature_moyenne":19,"month":4,"season":2},"predicted_cases":1110.6260552131782,"cases_trend":0.0,"trend_percentage":0.0,"previous_month_cases":1183.900766972473,"error":"Erreur de prédiction: X has 54 features, but StandardScaler is expecting 51 features as input."},{"month_index":5,"month_info":{"month":5,"season":2,"season_name":"Erreur","quarter":1},"weather_input":{"precipitation_mm":25,"humidite_moyenne":55,"insolation_hours":11,"temperature_moyenne":24,"month":5,"season":2},"predicted_cases":1151.289889201912,"cases_trend":0.0,"trend_percentage":0.0,"previous_month_cases":1110.6260552131782,"error":"Erreur de prédiction: X has 54 features, but StandardScaler is expecting 51 features as input."}],"summary":{"total_months":5,"initial_cases":1295,"final_cases":1151.289889201912,"total_predicted_cases":5775.408372857915,"average_monthly_cases":1155.081674571583,"peak_cases":1209.1554230837246,"peak_month":2,"lowest_cases":1110.6260552131782,"lowest_month":4,"overall_trend":"stable","evolution":"De 1295 à 1151 cas sur 5 mois"},"model_info":{"model_name":"Gradient Boosting","model_type":"GradientBoostingRegressor (Multi-Cities Model)","status":"trained_loaded_multicities"},"message":"Prédiction séquentielle sur 5 mois consécutifs réussie"}
    
  } catch (error) {
    console.error('Error processing file:', error)
    apiResponse.value = {
      status: 'error',
      message: error.message
    }
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.chart-container {
  height: 300px;
}
</style>