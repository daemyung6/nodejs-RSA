var crypto = require('crypto');

const fs = require("fs");
let private_key;
fs.readFile(`${__dirname}/private.key`, function(err, file) {
    if(err) {console.log(err); return}

    private_key = String(file);
    console.log("set private key");
    console.log(private_key);
})

module.exports = function(res, req) {
    let data = [];
    res.on('data', function (chunk) {
        data.push(chunk)
    });
    res.on('end', function () {
        try {
            let json = String(Buffer.concat(data));
            json = JSON.parse(json);

            console.log("get");
            console.log(json);

            let decrypted = crypto.privateDecrypt(
                {
                  key: private_key,
                  passphrase: '',
                  padding:crypto.constants.RSA_PKCS1_PADDING
                },
                Buffer.from(json.data, 'base64')
            )
            decrypted = decrypted.toString('utf8')
            console.log(decrypted);

            req.statusCode = 200;
            req.end();
        }
        catch (err) {
            req.statusCode = 503;
            console.log(err);
            req.end();
        }
    });
}