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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-700 rounded-lg p-6">
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

            <div class="bg-slate-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                {{ t('upload.apiConfig') }}
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">{{ t('upload.apiEndpoint') }}</label>
                  <input 
                    type="url" 
                    v-model="apiEndpoint"
                    placeholder="https://api.example.com/process"
                    class="w-full bg-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">{{ t('upload.method') }}</label>
                  <select v-model="apiMethod" class="w-full bg-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center pt-6">
            <button 
              @click="processFile"
              :disabled="!selectedFile || !apiEndpoint || isProcessing"
              :class="[
                'px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2',
                !selectedFile || !apiEndpoint || isProcessing
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

      <div v-if="apiResponse" class="bg-slate-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {{ t('upload.results') }}
        </h2>
        <div class="bg-slate-700 rounded-lg p-4">
          <pre class="text-slate-300 text-sm overflow-auto">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import LanguageSelector from '../components/LanguageSelector.vue'

const { t } = useI18n()

const selectedFile = ref(null)
const dragOver = ref(false)

const csvDelimiter = ref(',')
const hasHeaders = ref(true)

const apiEndpoint = ref('')
const apiMethod = ref('POST')

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
  if (!selectedFile.value || !apiEndpoint.value) return
  
  isProcessing.value = true
  
  try {
    // TODO: Implement CSV to JSON conversion and API call
    console.log('Processing file:', selectedFile.value.name)
    console.log('CSV Delimiter:', csvDelimiter.value)
    console.log('Has Headers:', hasHeaders.value)
    console.log('API Endpoint:', apiEndpoint.value)
    console.log('API Method:', apiMethod.value)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock response for now
    apiResponse.value = {
      status: 'success',
      message: 'File processed successfully',
      data: {
        recordsProcessed: 100,
        timestamp: new Date().toISOString()
      }
    }
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