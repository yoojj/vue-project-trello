module.exports = Object.freeze({

    ERROR : {
        boolean: false,

        get code(){ return 0 },
        set code(val) { code = val; },

        get message(){ return 'ERROR' },
        set message(val) { message = val; },
    },

    SUCCESS: {
        boolean: true,

        get code(){ return 1 },
        set code(val) { code = val; },

        get message(){ return 'SUCCESS' },
        set message(val) { message = val; },
    },

});
