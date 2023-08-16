export default defineNuxtRouteMiddleware((to, from) => {
    const User = useUserState();
    if (to.path === '/lainaus' || to.path === "/tiedot") {
      if (User.userData.value === undefined || User.userData.value === null) {
        return navigateTo("/kirjaudu")
      }
    }
  })