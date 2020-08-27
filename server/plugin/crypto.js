const crypto = require('crypto');



exports.encryption = (data, key='aes192', hex='base64') => {

    const cipher = crypto.createCipher(key, process.env.CRYPTO_KEY);
    cipher.update(data, 'utf8', hex);

    return cipher.final(hex).replace('/', '!=!');

};

exports.decryption = (data, key='aes192', hex='base64') => {

    data = data.replace('!=!', '/');

    const decipher = crypto.createDecipher(key, process.env.CRYPTO_KEY);
    decipher.update(data, hex, 'utf8');

    return decipher.final('utf-8');

};
