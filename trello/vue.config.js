module.exports = {

    configureWebpack: {
        plugins: [
        ]
    },

    chainWebpack: (config) => {

        config.devServer
            .host(process.env.VUE_APP_HOST)
            .port(process.env.VUE_APP_PORT)

        config
            .plugin('html')
            .tap( args => {

                args[0].title = 'Trello :: ' + process.env.VUE_APP_I18N_LOCALE;

                if(process.env.VUE_APP_I18N_LOCALE == 'ko'){
                    args[0].description = '트렐로';
                    args[0].keywords = '트렐로';

                } else {
                    args[0].description = 'trello';
                    args[0].keywords = 'trello ';
                }

             return args;
        });
    },

    pluginOptions: {
        i18n: {
            locale: process.env.VUE_APP_I18N_LOCALE,
            fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
            localeDir: '_vueI18n',
            enableInSFC: true
        },
    },

}
