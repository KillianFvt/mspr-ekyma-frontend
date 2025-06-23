import { createApp } from 'vue'
import App from './App.vue'
import './i18n.js'
import i18nPlugin from './plugins/i18n.js'

const app = createApp(App)
app.use(i18nPlugin)
app.mount('#app')
