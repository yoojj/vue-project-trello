import cookie from '@/_utils/cookie'

export default {

    setUserInfo: (state, data) => {

        cookie.set('trello-user-info', JSON.stringify(data.user), 1);
        cookie.set('trello-user-token', data.token, 1);

        const user = cookie.get('trello-user-info');
        const token = cookie.get('trello-user-token');

        state.user = JSON.parse(user);
        state.token = token;

    },

    logout: () => {
        cookie.delete('trello-user-info');
        cookie.delete('trello-user-token');
    },

}
