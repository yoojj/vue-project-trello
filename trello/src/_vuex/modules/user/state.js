import cookie from '@/_utils/cookie'

const user = cookie.get('trello-user-info') || null;
const token = cookie.get('trello-user-token') || '';

export default {

    info: user,
    token: token

}
