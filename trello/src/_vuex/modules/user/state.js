import cookie from '@/_utils/cookie'

const $user = cookie.get('trello-user-info') || null;
const $token = cookie.get('trello-user-token') || null;

export default {

    user: $user ? JSON.parse($user) : null,
    token: $token,

}
