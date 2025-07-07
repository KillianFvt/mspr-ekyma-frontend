<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-emerald-900/20"></div>

    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div class="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-32 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div class="absolute bottom-20 right-20 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
        <div class="text-center mb-8">
          <div class="bg-gradient-to-br from-emerald-500 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Connexion</h1>
          <p class="text-slate-200">Accédez à votre tableau de bord</p>
        </div>

        <div v-if="errorMessage" class="mb-6 bg-red-900/20 border border-red-700/50 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-200 mb-2">
              Nom d'utilisateur
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="votre_nom_utilisateur"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-200 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L12 12m0 0l2.122 2.122M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                  id="remember"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-600 rounded bg-slate-700"
              />
              <label for="remember" class="ml-2 text-sm text-slate-200">
                Se souvenir de moi
              </label>
            </div>
            <!-- <a href="#" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Trop coooool
            </a> -->
          </div>

          <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m100 50c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-74.2 2.9l22.7-22.7c1.4-1.4 3.6-1.4 5 0s1.4 3.6 0 5l-22.7 22.7c-1.4 1.4-3.6 1.4-5 0s-1.4-3.6 0-5z"></path>
            </svg>
            <span>{{ isLoading ? 'Connexion...' : 'Se connecter' }}</span>
          </button>
        </form>

        <div class="text-center mt-6">
          <a
              href="https://killianfauvette.fr/admin"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-white underline hover:text-emerald-400 transition-colors"
          >
            Vous êtes un administrateur ? Cliquez ici !
          </a>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-slate-300 text-sm">
          © 2025 MSPR Ekyma. Tous droits réservés.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {API_URL} from "../constants.js";

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (response.ok) {
      console.log('Connexion réussie!')

      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', username.value)
      }

      window.dispatchEvent(new CustomEvent('loginSuccess'))

    } else {
      const errorData = await response.json().catch(() => ({}))

      if (response.status === 401) {
        errorMessage.value = 'Nom d\'utilisateur ou mot de passe incorrect'
      } else if (response.status === 400) {
        errorMessage.value = 'Données de connexion invalides'
      } else {
        errorMessage.value = 'Erreur de connexion. Veuillez réessayer.'
      }
    }
  } catch (error) {
    console.error('Erreur de connexion:', error)
    errorMessage.value = 'Impossible de se connecter au serveur'
  } finally {
    isLoading.value = false
  }
}

const loadRememberedData = () => {
  if (localStorage.getItem('rememberMe') === 'true') {
    rememberMe.value = true
    username.value = localStorage.getItem('userEmail') || ''
  }
}

loadRememberedData()
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

input[type="checkbox"]:checked {
  background-color: #10b981;
  border-color: #10b981;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

button:hover {
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
}
</style>