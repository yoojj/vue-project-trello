export default {

    MAIL_AUTH: (dispatch, data) => {
    return axios.post('/auth/mail', data)
        .then( response => {
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

    CODE_CHECK: (dispatch, data) => {
    return axios.post('/auth/code', data)
        .then( response => {
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

    SIGN_UP: (dispatch, data) => {
    return axios.post('/auth/join', data)
        .then( response => {
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

    LOGIN: ({commit}, data) => {
    return axios.post('/auth/login', data)
        .then( response => {
            commit('setUserInfo', response.data);
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

    SET_TOKEN: ({commit}) => {
    return axios.post('/auth/refresh-token')
        .then( response => {
            commit('setUserInfo', response.data);
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

    LOGOUT: ({commit}) => {
    return axios.post('/auth/logout')
        .then( response => {
            commit('logout');
            return response.data;

        }).catch( err => {
            console.log(err);
            return Promise.reject(err.result.message);
        });
    },

}
