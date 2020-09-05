export default Object.freeze({

    NOT_FOUND : () => import('@/views/error/NotFound.vue'),

    TRELLO    : () => import('@/views/Trello.vue'),
    SIGN_UP   : () => import('@/views/member/Signup.vue'),
    LOGIN     : () => import('@/views/member/Login.vue'),
    LOGOUT    : () => import('@/views/member/Logout.vue'),

    USER_HOME : () => import('@/views/user/UserHome.vue'),
    PROFILE   : () => import('@/views/user/Profile.vue'),

    CARD_LIST : () => import('@/views/user/CardList.vue'),

})
