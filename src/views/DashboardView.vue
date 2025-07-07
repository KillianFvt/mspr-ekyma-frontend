<template>
  <div class="min-h-screen bg-slate-900 text-white p-4 sm:p-6 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-emerald-900/20"></div>
    
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-32 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div class="absolute bottom-20 right-20 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      <div class="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-3000"></div>
      <div class="absolute top-1/3 right-1/4 w-36 h-36 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-4000"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-700 animate-fade-in">
        <div class="flex items-center mb-4 sm:mb-0">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-lg mr-4 shadow-lg animate-pulse-slow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white mb-1">{{ t('upload.title') }}</h1>
            <p class="text-slate-200 mb-2">{{ t('upload.subtitle') }}</p>
            <div class="flex items-center mt-2">
              <div class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              <span class="text-emerald-400 text-sm font-medium">Connecté et prêt</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <LanguageSelector />
          <div class="bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-slate-300 flex items-center border border-slate-700">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {{ t('upload.ready') }}
          </div>
          <div class="relative group">
            <button 
              @click="$emit('logout')"
              class="bg-slate-800/80 backdrop-blur-sm hover:bg-red-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-red-500 transition-all duration-300 flex items-center space-x-2 group shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Se déconnecter</span>
            </button>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Déconnexion sécurisée
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 rounded-xl p-8 shadow-lg mb-8 animate-slide-up" style="animation-delay: 0.1s;">
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
              <p class="text-slate-200 text-sm">{{ t('upload.formats') }}</p>
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
                  <label class="block text-sm font-medium text-slate-200 mb-2">{{ t('upload.delimiter') }}</label>
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
                  <label for="hasHeaders" class="ml-2 text-sm text-slate-200">{{ t('upload.hasHeaders') }}</label>
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

      <div v-if="apiResponse && (apiResponse.success || apiResponse.predictions)" class="space-y-6">
        <div v-if="apiResponse.predictions" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.2s;">
            <div class="flex items-center mb-3">
              <div class="bg-purple-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Informations générales</h3>
            </div>
            <p class="text-purple-200 text-sm mb-2">{{ apiResponse.message }}</p>
            <div class="mt-3 flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              <span class="text-purple-200 text-xs">Prédiction réussie</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.3s;">
            <div class="flex items-center mb-3">
              <div class="bg-blue-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Résumé des prédictions</h3>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">Nombre total:</span>
                <span class="text-white font-medium">{{ apiResponse.total_predictions }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">Moyenne:</span>
                <span class="text-white font-medium">{{ Math.round(apiResponse.predictions.reduce((sum, p) => sum + p.prediction, 0) / apiResponse.predictions.length).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-200 text-sm">Lieu:</span>
                <span class="text-white font-medium">{{ apiResponse.predictions[0]?.location || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.4s;">
            <div class="flex items-center mb-3">
              <div class="bg-emerald-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Données historiques</h3>
            </div>
            <div class="space-y-2">
              <div>
                <span class="text-emerald-200 text-sm block">Dernière date:</span>
                <span class="text-white font-bold text-lg">{{ new Date(apiResponse.historical_data_info.last_historical_date).toLocaleDateString('fr-FR') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-emerald-200 text-sm">Enregistrements:</span>
                <span class="text-white font-medium">{{ apiResponse.historical_data_info.historical_records }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-emerald-200 text-sm">Moyenne historique:</span>
                <span class="text-white font-medium">{{ Math.round(apiResponse.historical_data_info.avg_historical_cases).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="apiResponse.success" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.2s;">
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

          <div class="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.3s;">
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

          <div class="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-xl p-6 text-white animate-slide-up" style="animation-delay: 0.4s;">
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

        <div class="bg-slate-800 rounded-xl p-6 shadow-lg animate-slide-up" style="animation-delay: 0.5s;">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{ t('upload.predictionChart') }}
            </h2>
            <div class="text-sm text-slate-200">
              {{ apiResponse.message || (apiResponse.sequence_predictions ? 'Prédictions séquentielles' : 'Prédictions') }}
            </div>
          </div>
          <PredictionChart :data="apiResponse" />
        </div>

        <div v-if="apiResponse.predictions" class="bg-slate-800 rounded-xl p-6 shadow-lg animate-slide-up" style="animation-delay: 0.6s;">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Prédictions détaillées
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-700">
                  <th class="text-left py-3 px-2 text-slate-300 font-medium">Date</th>
                  <th class="text-left py-3 px-2 text-slate-300 font-medium">Lieu</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">Cas prédits</th>
                  <th class="text-right py-3 px-2 text-slate-300 font-medium">Valeur exacte</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prediction, index) in apiResponse.predictions" :key="index" class="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td class="py-3 px-2 text-white font-medium">
                    {{ new Date(prediction.date).toLocaleDateString('fr-FR') }}
                  </td>
                  <td class="py-3 px-2 text-slate-200">{{ prediction.location }}</td>
                  <td class="py-3 px-2 text-right text-white font-medium">{{ Math.round(prediction.prediction).toLocaleString() }}</td>
                  <td class="py-3 px-2 text-right text-slate-200">{{ prediction.prediction.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="apiResponse.sequence_predictions" class="bg-slate-800 rounded-xl p-6 shadow-lg animate-slide-up" style="animation-delay: 0.6s;">
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
                  <td class="py-3 px-2 text-slate-200">{{ prediction.month_info.season_name }}</td>
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
                  <td class="py-3 px-2 text-right text-slate-200">{{ prediction.weather_input.temperature_moyenne }}°C</td>
                  <td class="py-3 px-2 text-right text-slate-200">{{ prediction.weather_input.precipitation_mm }}mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else-if="apiResponse && !apiResponse.success && !apiResponse.predictions" class="bg-slate-800 rounded-xl p-6 shadow-lg border border-red-500/20 animate-slide-up" style="animation-delay: 0.2s;">
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
import { API_URL } from '../constants.js'

const emit = defineEmits(['logout'])

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
  apiResponse.value = null
  
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
        
    const response = await fetch(`${API_URL}/api/covid-prediction/`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    apiResponse.value = data
    
  } catch (error) {
    console.error('Error processing file:', error)
    apiResponse.value = {
      success: false,
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

/* Animations de fou */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out both;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.delay-3000 {
  animation-delay: 3s;
}

.delay-4000 {
  animation-delay: 4s;
}

.bg-slate-800 {
  transition: all 0.3s ease;
}

.bg-slate-800:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.bg-gradient-to-br {
  transition: all 0.3s ease;
}

.bg-gradient-to-br:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>