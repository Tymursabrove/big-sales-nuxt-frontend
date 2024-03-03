export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const access_token = localStorage.getItem('access_token');

        if (! access_token) {
            return navigateTo('/login');
        }
    }
})
