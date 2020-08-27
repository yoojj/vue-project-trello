const crypto = require('crypto');



exports.encrypt = (data, key='aes192', hex='base64') => {

    if(data.length == 0)
        throw new Error();

    const cipher = crypto.createCipher(key, process.env.CRYPTO_KEY);

    return Buffer.concat([
        cipher.update(data),
        cipher.final(),
    ]).toString(hex).replace('/', '!=!');

};

exports.decrypt = (data, key='aes192', hex='base64') => {

    if(data.length == 0)
        throw new Error();

    data = data.replace('!=!', '/');

    const decipher = crypto.createDecipher(key, process.env.CRYPTO_KEY);

    return Buffer.concat([
        decipher.update(data, hex),
        decipher.final(),
    ]).toString();

};
