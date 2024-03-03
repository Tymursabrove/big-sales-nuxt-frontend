import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    axios.defaults.baseURL = nuxtApp.$config.public.apiBase;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = '1';

    return {
        provide: {
          axios
        }
    }
})
