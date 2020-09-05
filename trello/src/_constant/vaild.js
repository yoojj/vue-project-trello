export default Object.freeze({

    NAME: {
        get min() { return 1 },
        set min(val) { min = val },
    },

    ID: {
        get min() { return 3 },
        set min(val) { min = val },
    },

    PASSWORD: {
        get min() { return 3 },
        set min(val) { min = val },
    },

    TITLE: {
        get min() { return 1 },
        set min(val) { min = val },
    },

})
