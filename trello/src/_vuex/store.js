import Vue from 'vue'
import Vuex from 'vuex'

import vaild from '@/_constant/vaild'
import pattern from '@/_constant/pattern'

import user from './modules/user/'
import board from './modules/board/'

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        user,
        board,
    },

    state: {
        vaild,
        pattern,
    },

    getters: {
        VAILD: (state) => state.vaild,
        PATTERN: (state) => state.pattern,
    },

});
