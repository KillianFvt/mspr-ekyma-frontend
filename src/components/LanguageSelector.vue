<template>
  <div class="relative">
    <select 
      :value="language" 
      @change="handleLanguageChange"
      class="bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
    >
      <option value="fr">🇫🇷 {{ t('language.fr') }}</option>
      <option value="en">🇺🇸 {{ t('language.en') }}</option>
    </select>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t, changeLanguage, language } = useI18n()

const handleLanguageChange = (event) => {
  const newLanguage = event.target.value
  if (newLanguage !== language.value) {
    changeLanguage(newLanguage)
  }
}

watch(language, (newLang, oldLang) => {
  console.log(`Language changed from ${oldLang} to ${newLang}`)
}, { immediate: true })
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style> 