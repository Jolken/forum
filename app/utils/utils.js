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
        token : (username, token, callback) => {
            let compare = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].token === token);
                }
                catch (e) {
                    callback(false);
                }
            };
            dbUtils.get.token(username, compare);
        },
        username : (username, callback) => { 
            let check = (dbResponse) => {
                try {
                    if (dbResponse.rows[0].username === username) {
                        callback(false);
                    }
                }
                catch (e) {
                    callback(true);
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
        user: (username, password, email, callback) => {
            dbUtils.create.user(username, password, null, 0, 11112011, email, callback);
        },
        thread: (name, moders, callback) => {
            dbUtils.create.thread(name, moders, callback);
        }
    },

    remove : {
        user: (username, callback) => {
            dbUtils.delete.user(username, callback);
        }
    },

    db : dbUtils,

}