import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/_vuex/store'
import PATH from '@/_constant/path'

Vue.use(VueRouter);

let userId;

if(store.getters.token){
    userId = store.getters.user.id || store.getters.user.uno;
}

const isUserLogin = (bool) => (to, from, next) => {

    if(bool==false){
        !store.getters.token
          ? next()
          : next({path: `/${userId}` })

    } else if(bool==true){
        store.getters.token
          ? next()
          : next({path: 'login'})

    } else {
        next({path: '/404'})
    }

}

export default new VueRouter({

    mode: 'history',

    base: process.env.BASE_URL,

    //scrollBehavior: () => ({ y:0 }),

    routes: [
        {
            path: '/404',
            alias: '*',
            name: PATH.NOT_FOUND.name,
            component: PATH.NOT_FOUND,
        },{
            path: '/',
            name: PATH.TRELLO.name,
            component: PATH.TRELLO,
            beforeEnter: isUserLogin(false),
        },{
            path: '/signup',
            name: PATH.SIGN_UP.name,
            component: PATH.SIGN_UP,
            beforeEnter: isUserLogin(false),
        },{
            path: '/login',
            name: PATH.LOGIN.name,
            component: PATH.LOGIN,
            beforeEnter: isUserLogin(false),
        },{
            path: `/${userId}/logout`,
            alias: '/logout',
            name: PATH.LOGOUT.name,
            component: PATH.LOGOUT,
            beforeRouteUpdate: isUserLogin(false),
        },{
            path: `/${userId}`,
            name: PATH.USER_HOME.name,
            component: PATH.USER_HOME,
            beforeEnter: isUserLogin(true),
            //children: []
        },{
            path: `/${userId}/profile`,
            name: PATH.USER_PROFILE.name,
            component: PATH.USER_PROFILE,
            beforeEnter: isUserLogin(true),
        },{
            path: `/${userId}/board-list`,
            name: PATH.BOARD_LIST.name,
            component: PATH.BOARD_LIST,
            beforeEnter: isUserLogin(true),
        },{
            path: `/${userId}/card-list/:uuid`,
            name: PATH.CARD_LIST.name,
            component: PATH.CARD_LIST,
            beforeEnter: isUserLogin(true),
            beforeEnter: (to, from, next) => {

                if(store.getters.uuidList.includes(to.params.uuid)){
                    next();
                } else {
                    next({path: '/404'});
                }

            },
        },{
            path: `/${userId}/search`,
            alias: '/search',
            name: PATH.SEARCH.name,
            component: PATH.SEARCH,
        },
    ]

});
