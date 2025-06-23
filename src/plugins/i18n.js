import { reactive } from 'vue'
import i18n from '../i18n.js'

const state = reactive({
  currentLanguage: i18n.language || 'fr',
  version: 0
})

i18n.on('languageChanged', (lng) => {
  state.currentLanguage = lng
  state.version++
})

export default {
  install(app) {
    const $t = (key, options) => {
      state.version
      return i18n.t(key, options)
    }

    const $changeLanguage = async (lng) => {
      await i18n.changeLanguage(lng)
      state.currentLanguage = lng
      state.version++
    }

    app.config.globalProperties.$t = $t
    app.config.globalProperties.$changeLanguage = $changeLanguage
    app.provide('i18n', {
      t: $t,
      changeLanguage: $changeLanguage,
      language: () => state.currentLanguage
    })
  }
} 