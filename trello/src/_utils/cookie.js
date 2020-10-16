export default {

    set(name, value, days=1) {
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * days);
        document.cookie = `${name}=${value};expires=${date.toGMTString()}`;
    },

    get(name) {
        const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
        return value ? value[2] : null;
    },

    delete(name) {
        this.set(name, '', -1);
    },

}
