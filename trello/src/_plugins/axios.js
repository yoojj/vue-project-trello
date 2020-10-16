import Vue from 'vue'
import axios from 'axios'
import store from '@/_vuex/store'

const _axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
    withCredentials: true,
});

_axios.interceptors.request.use(

    function(config) {

        const exceptUrl = [
            '/auth/mail',
            '/auth/code',
            '/auth/join',
            '/auth/login',
        ];

        if(!exceptUrl.includes(config.url))
            config.headers['Authorization'] = 'Bearer ' + store.getters.token;

        return config;

    },

    function(error) {
        return Promise.reject(error);
    },

);

_axios.interceptors.response.use(

    function(response) {
        return response;
    },

    function(err) {

        if(err.response.data.result.message == 'jwt expired') {
            location.href = '/logout';

        } else {
            return Promise.reject(err.response.data);
        }

    },

);

Plugin.install = function(Vue) {

    Object.defineProperty(window, 'axios', {
        get() { return _axios }
    });

    Object.defineProperties(Vue.prototype, {
        axios: {
            get() { return _axios }
        },

        $axios: {
            get() { return _axios }
        },
    });

};

Vue.use(Plugin);



export default Plugin;
