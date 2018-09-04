const crypto = require('crypto');
const dbUtils = require(APP_ROOT + '/app/utils/dbUtils');

module.exports = {
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
            dbUtils.get.password(username, compare);

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
            dbUtils.get.token(username, compare);
        },
        username: (username, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(!(dbResponse.rows[0].username === username));
                }
                catch (e) {
                    callback(1);
                }

            }
            dbUtils.get.username(username, check);
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
            dbUtils.get.threadName(name, check);
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

            dbUtils.create.thread(name, inserted);
        }
    },

    remove: {
        user: (username, callback) => {
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
        },
    },

    db: dbUtils,

}