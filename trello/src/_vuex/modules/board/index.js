import cookie from '@/_utils/cookie'



const $uuidList = cookie.get('trello-board-uuid-list') || null;

export default {


    state: {
        boardList: null,
        boardUuidList: $uuidList ? $uuidList : null,
    },


    getters: {

        boardList: (state) => {
            return state.boardList;
        },

        boardUuidList: (state) => {
            return state.boardUuidList;
        },

    },


    mutations: {

        setBoardList: async(state, data) => {

            await cookie.delete('trello-board-uuid-list');

            const uuidArr = data.map( (board) => {
                return board.uuid;
            });

            await cookie.set('trello-board-uuid-list', uuidArr, 1);

            state.boardList = data;
            state.boardUuidList = cookie.get('trello-board-uuid-list');

        },

        deleteBoardList: () => {
            cookie.delete('trello-board-uuid-list');
        },

    },


    actions: {

        BOARD_WRITE: ({dispatch}, data) => {
        return axios.post('/board/write', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        BOARD_LIST: ({commit}) => {
        return axios.post('/board/list')
            .then( response => {
                commit('setBoardList', response.data.boards);
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },
        
        BOARD_VIEW: ({dispatch}, data) => {
        return axios.post('/board/view', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        BOARD_MODIFY: ({dispatch}, data) => {
        return axios.post('/board/modify', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        BOARD_CLOSE: ({dispatch}, data) => {
        return axios.post('/board/close', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


}
