export default {

    state: {
        search: null,
    },

    getters: {
        search: (state) => {
            return state.search;
        },
    },


    mutations: {
        setSearch: (state, data) => {
            state.search = data;
        },
    },


    actions: {

        BOARD_SEARCH: ({commit}) => {
        return axios.post('/search')
            .then( response => {
                commit('setSearch', response.data);
                return response.data.boards;
                
            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


}
