const crypto = require('crypto');
const dbUtils = require(APP_ROOT + '/app/utils/dbUtils');
const pg = require('pg');
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);

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
                    callback(!(dbResponse === username));
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
        access: (username, minlvl, callback) => {
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
            let usernameChecked = (status) => {
                if (status) {
                    dbUtils.create.user(username, password, null, 0, 11112011, email, callback);
                }
                else {
                    callback(0);
                }

            };
            utils.check.usernameAvaible(username, usernameChecked);
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
        },
        username: (username, callback) => {
            let check = (dbResponse) => {
                try {
                    callback(dbResponse.rows[0].username);
                }
                catch (e) {
                    callback(0);
                }
            };
            dbUtils.get.username(username, callback);
        },
        postLastId: (thread, callback) => {
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

var utilsNew = {
    functions: {
        login: async (username, password) => {
            if (await utilsNew.check.password(username, password)) {
                return utilsNew.generate.token(username);
            }
            else {
                return 0;
            }
        }
    },

    check: {
        password: async (username, password) => {
            let dbResponse  = await dbUtils.get.password(username);
            try {
                return password == dbResponse.rows[0].pass;
            }
            catch (e) {
                console.log(e);
                return 0;
            }
        },
        usernameAvailable: async (username) => {
            let dbResponse = await dbUtils.get.username(username);
            try {
                return username != dbResponse.rows[0].username;
            }
            catch (e) {
                return 1;
            }
        },
        token: async (username, token) => {
            let dbResponse = await dbUtils.get.token(username);
            try {
                return token == dbResponse.rows[0].token;
            }
            catch (e) {
                console.log(e);
                return 0;
            }
        },
    },

    get: {
        password: async (username) => {
            let dbResponse = await dbUtils.get.password(username);
            return dbResponse.rows[0].pass;
        }
    },

    new: {
        user: async (username, password, email) => {
            if (await utilsNew.check.usernameAvailable(username)) {
                let created = await dbUtils.create.user(username, password, null, 0, 11112011, email);
                let token = await utilsNew.generate.token(username);
                if (token) {
                    return token;
                }
                return created;
            }
            else {
                return 0;
            }
        },

    },

    delete: {
        user: async (username, token, password) => {
            if (await utilsNew.check.token(username, token)) {
                if (await utilsNew.check.password(username, password)) {
                    return await dbUtils.delete.user(username);
                }
            }
            else {
                return 0;
            }
        },
    },

    generate: {
        token: async (username) => {
            let token = crypto.randomBytes(256).toString('hex');
            if (await dbUtils.update.token(username, token)) {
                return token;
            } 
            return 0;
        },
    },
};

module.exports = utilsNew;