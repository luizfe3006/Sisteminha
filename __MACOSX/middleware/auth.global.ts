export default defineNuxtRouteMiddleware((to, from) => {
    // const token = useCookie('token');
    
    if (to.path === '/') {
        // if (token.value) {
        //     return navigateTo('/sistema');
        // }
        return navigateTo('/login');
    }

    // if (to.path.startsWith('/sistema')) {
    //     if (!token.value) {
    //         return navigateTo('/login');
    //     }
    // }
});
  