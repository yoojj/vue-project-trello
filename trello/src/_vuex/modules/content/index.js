export default {


    state: {
    },


    getters: {
    },


    mutations: {
    },


    actions: {

        CONTENT_WRITE: (dispatch, data) => {
        return axios.post('/content/write', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CONTENT_LIST: (dispatch, data) => {
        return axios.post('/content/list', data)
            .then( response => {
                return response.data.contents;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CONTENT_MODIFY: (dispatch, data) => {
        return axios.post('/content/modify', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

        CONTENT_DELETE: (dispatch, data) => {
        return axios.post('/content/delete', data)
            .then( response => {
                return response.data;

            }).catch( err => {
                console.log(err);
                return Promise.reject(err.result.message);
            });
        },

    },


}
