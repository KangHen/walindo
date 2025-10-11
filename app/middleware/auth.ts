
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, initAuth } = useAuth()
  initAuth()

  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})