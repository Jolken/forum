const crypto = require('crypto');
const dbUtils = require(APP_ROOT+'/app/utils/dbUtils');

module.exports = {
    check : {
        password : (username, password, login, res) => {
           dbUtils.compare.password(username, password, login, res);//compare password
        },
        token : (username, token) => {
            return 1;
        },

    },
    
    generate : {
        token : (username) => {
            let token = crypto.randomBytes(256).toString('hex');
            dbUtils.update.token(username, token);
            return token;
        },
    },
    db : dbUtils,

}