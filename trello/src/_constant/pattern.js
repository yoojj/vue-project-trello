export default Object.freeze({

    /* YYYY-MM-DD */
    DATE: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',

    USER_NAME : /^[가-힣|a-z|A-Z]+$/,
    USER_EMAIL: /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]+$/,
    USER_PWD  : /^[a-z|A-Z|0-9]+$/,

})
