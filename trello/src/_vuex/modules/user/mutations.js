import cookie from '@/_utils/cookie'

export default {

    setUserInfo(state, data) {
        const user = data.user;
        const token = data.token;
        cookie.set('trello-user-info', JSON.stringify(user), 1);
        cookie.set('trello-user-token', token, 1);
    },

    logout() {
        cookie.delete('trello-user-info');
        cookie.delete('trello-user-token');
    },

}
