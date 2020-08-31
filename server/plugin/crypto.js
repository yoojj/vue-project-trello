const crypto = require('crypto');



exports.encrypt = (data, key='aes192', hex='base64') => {

    if(data.length == 0)
        return new Error();

    const cipher = crypto.createCipher(key, process.env.CRYPTO_KEY);
    const result = Buffer.concat([
            cipher.update(data),
            cipher.final(),
        ]).toString(hex).replace(/[+]|[/]/g, (match) => {
            return match == '+' ? '!==!' : '=!!=';
        });

    return result;
};

exports.decrypt = (data, key='aes192', hex='base64') => {

    if(data.length == 0)
        return new Error();

    data = data.replace(/!==!|=!!=/g, (match) => {
        return match == '!==!' ? '+' : '/';
    });

    const decipher = crypto.createDecipher(key, process.env.CRYPTO_KEY);

    const result = Buffer.concat([
        decipher.update(data, hex),
        decipher.final(),
    ]).toString();

    return result;
};
