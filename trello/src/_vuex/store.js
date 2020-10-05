import Vue from 'vue'
import Vuex from 'vuex'

import vaild from '@/_constant/vaild'
import pattern from '@/_constant/pattern'

import user from './modules/user/'
import board from './modules/board/'
import card from './modules/card/'
import content from './modules/content/'
import search from './modules/search/'

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        user,
        board,
        card,
        content,
        search,
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
