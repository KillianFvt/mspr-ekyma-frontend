<template>
  <DashboardView />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import DashboardView from "./views/DashboardView.vue"

export default {
  name: 'App',
  components: {
    DashboardView
  },
  setup() {
    const showLogin = ref(true)

    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/protected/', {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          showLogin.value = false
        }
      } catch (error) {
        console.log('Vérification d\'authentification échouée:', error)
      }
    }

    const handleLoginSuccess = () => {
      showLogin.value = false
    }

    const handleLogout = async () => {
      try {
        const response = await fetch('/api/logout/', {
          method: 'POST',
          credentials: 'include'
        })

        if (response.ok) {
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('userEmail')
          
          showLogin.value = true
        }
      } catch (error) {
        console.log('Échec de la déconnexion:', error)
      }
    }

    onMounted(() => {
      window.addEventListener('loginSuccess', handleLoginSuccess)
      checkAuthStatus()
    })

    onUnmounted(() => {
      window.removeEventListener('loginSuccess', handleLoginSuccess)
    })

    return {
      showLogin,
      handleLogout
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
