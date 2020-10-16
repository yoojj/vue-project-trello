import Vue from 'vue'
import App from '@/App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/_vuex/store'
import '@/_plugins/axios'
import '@/_plugins/auth'
import '@/assets/css/basic.css'
import '@/assets/css/common.css'

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
