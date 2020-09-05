import Vue from 'vue'
import store from '@/_vuex/store'

const user = store.getters.user;

const Auth = {

    install(Vue, options) {

        Object.defineProperties(Vue.prototype, {
            $user: {
                get() { return user }
            },
        });

    }

};

Vue.use(Auth);



export default Auth;
