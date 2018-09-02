const crypto = require('crypto');
const dbUtils = require(APP_ROOT+'/app/utils/dbUtils');

module.exports = {
    check : {
        password : (username, password, callback) => {
            let compare = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].pass === password);    
                }
                catch (e) {
                    callback(false);
                }
            };
            dbUtils.get.password(username, compare);
           
        },
        token : (username, token) => {
            return 1;
        },
        username : (username, unique) => { 
            let check = (dbResponse) => {
                try {
                    if (dbResponse.rows[0].username === username) {
                        unique(false);
                    }
                }
                catch (e) {
                    unique(true);
                }

            }
            dbUtils.get.username(username, check);
        }

    },
    
    generate : {
        token : (username) => {
            let token = crypto.randomBytes(256).toString('hex');
            dbUtils.update.token(username, token);
            return token;
        },
    },

    new : {
        user: (username, password, email, success) => {
            dbUtils.create.user(username, password, null, 0, 11112011, email, success);
        }
    },

    db : dbUtils,

}