export default {

    state: {
        boardList : [],
    },


    mutations: {
        setBoardList(state, data) {
            state.boardList = data;
        },
    },


    actions: {

        BOARD_LIST ({commit}) {
        return axios.post('/board/list')
            .then( response => {
                commit('setBoardList', response.data.boards);

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        BOARD_WRITE (dispatch, data) {
        return axios.post('/board/write', data)
            .then( response => {
                console.log(response);
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


    getters: {
        getBoardList(state){
            return state.boardList;
        }
    },


}
