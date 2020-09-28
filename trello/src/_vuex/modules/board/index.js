import cookie from '@/_utils/cookie'

const $bnoList = cookie.get('trello-bno-list') || null;

export default {

    state: {
        boardList: null,
        bnoList: $bnoList ? $bnoList : null,
    },

    getters: {
        boardList: (state) => {
            return state.boardList;
        },
        bnoList: (state) => {
            return state.bnoList;
        },
    },


    mutations: {
        setBoardList: (state, data) => {

            const bnoArr = data.map( (board) => {
                return board.bno;
            });

            cookie.set('trello-bno-list', bnoArr, 1);

            state.boardList = data;
            state.bnoList = cookie.get('trello-bno-list');

        },

        deleteBoardList: () => {
            cookie.delete('trello-bno-list');
        },
    },


    actions: {

        BOARD_LIST: ({commit}) => {
        return axios.post('/board/list')
            .then( response => {
                commit('setBoardList', response.data.boards);
                return response.data.boards;
            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        BOARD_WRITE: (dispatch, data) => {
        return axios.post('/board/write', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


}
