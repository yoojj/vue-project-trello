import Vue from 'vue'
import store from '@/_vuex/store'

const Auth = {

    install(Vue, options) {

        Object.defineProperties(Vue.prototype, {
            $user: {
                get() {
                    const user = store.getters.user;
                    return user;
                }
            },
        });

    }

};

Vue.use(Auth);



export default Auth;
