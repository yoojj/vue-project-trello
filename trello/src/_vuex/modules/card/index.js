export default {


    state: {
        cardAllList: null,
    },


    getters: {

        cardAllList: (state) => {
            return state.cardAllList;
        },

    },


    mutations: {

        setCardAllList: (state, data) => {
            state.cardAllList = data;
        },

    },


    actions: {

        CARD_WRITE: (dispatch, data) => {
        return axios.post('/card/write', data)
            .then( response => {
                return response.data.card;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CARD_ALL_LIST: ({commit}) => {
        return axios.post('/card/all-list')
            .then( response => {
                commit('setCardAllList', response.data.cards);
                return response.data.cards;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CARD_LIST: (dispatch, data) => {
        return axios.post('/card/list', data)
            .then( response => {
                return response.data.cards;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CARD_MODIFY: (dispatch, data) => {
        return axios.post('/card/modify', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },
        
        CARD_DELETE: (dispatch, data) => {
        return axios.post('/card/delete', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


}
