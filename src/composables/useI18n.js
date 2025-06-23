import { ref, computed, watchEffect } from 'vue'
import i18n from '../i18n.js'

const currentLanguage = ref(i18n.language || 'fr')
const forceUpdate = ref(0)

i18n.on('languageChanged', (lng) => {
  console.log('i18n languageChanged event fired:', lng)
  currentLanguage.value = lng
  forceUpdate.value++
})

export function useI18n() {
  const t = (key, options) => {
    forceUpdate.value
    const result = i18n.t(key, options)
    return result
  }

  const changeLanguage = async (lng) => {
    console.log('Changing language to:', lng)
    try {
      await i18n.changeLanguage(lng)
      currentLanguage.value = lng
      forceUpdate.value++
      console.log('Language changed successfully to:', lng)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  const language = computed(() => {
    return currentLanguage.value
  })

  return {
    t,
    changeLanguage,
    language
  }
} 