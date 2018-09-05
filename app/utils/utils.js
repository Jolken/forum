const crypto = require('crypto');
const dbUtils = require(APP_ROOT + '/app/utils/dbUtils');

var utils = {
    check: {
        password: (username, password, callback) => {
            let compare = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].pass === password);
                }
                catch (e) {
                    callback(false);
                }
            };
            utils.get.password(username, compare);

        },
        token: (username, token, callback) => {
            let compare = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].token === token);
                }
                catch (e) {
                    callback(false);
                }
            };
            utils.get.token(username, compare);
        },
        usernameAvaible: (username, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(!(dbResponse.rows[0].username === username));
                }
                catch (e) {
                    callback(1);
                }

            }
            utils.get.username(username, check);
        },
        thread: (name, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(!(dbResponse.rows[0].name === name));
                }
                catch (e) {
                    callback(1);
                }
            }
            utils.get.threadName(name, check);
        },
        access : (username, minlvl, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].lvl >= minlvl);
                }
                catch (e) {
                    callback(0)
                }
            };
            dbUtils.get.userLvl(username, check);
        },

    },

    generate: {
        token: (username) => {
            let token = crypto.randomBytes(256).toString('hex');
            dbUtils.update.token(username, token);
            return token;
        },
    },

    new: {
        user: (username, password, email, callback) => {
            //utils.check.token();
            //utils.check.usernameAvaible();
            dbUtils.create.user(username, password, null, 0, 11112011, email, callback);
        },
        thread: (name, callback) => {
            let inserted = (status) => {
                if (status) {
                    dbUtils.create.table(name, callback);
                }
                else {
                    callback(0)
                }
            };
            //utils.check.thread();
            //utils.check.token();
            //lvl
            //utils.new.thread();
            //inserted

            dbUtils.create.thread(name, inserted);
        },
        post: () => {
            //token
            //lvl
            //create
            //success
        }
    },

    remove: {
        user: (username, callback) => {
            //token
            //password
            //success
            dbUtils.delete.user(username, callback);
        }
    },

    get: {
        threads: (callback) => {
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows);
                }
                catch (e) {
                    callback(0);
                }
            };
            dbUtils.get.threads(check);
        },
        thread: (name, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows);
                }
                catch (e) {
                    callback(0);
                }
            };
            dbUtils.get.thread(name, check);
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].lvl);
                }
                catch (e) {
                    callback(0);
                }
            };
            dbUtilaccess : (username, lvl, minlvl) => {
            
            },(name, check);
        },
        postLastId : (thread, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].id);
                }
                catch (e) {
                    callback(0);
                }
            };
            dbUtils.get.postLastId(thread, check);
        }
    },

    db: dbUtils,

}


module.exports = utils;