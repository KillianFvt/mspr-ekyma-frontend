import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import it from './locales/it.json'

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  it: {
    translation: it
  }
}

i18n
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    debug: true,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })
  .then(() => {
    console.log('i18next initialized successfully')
  })

// Log des changements de langue
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng)
})

export default i18n 