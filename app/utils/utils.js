const crypto = require('crypto');
const dbUtils = require(APP_ROOT + '/app/utils/dbUtils');
const pg = require('pg');
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);
const ADMIN = 'jolken';

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
            let dbResponse = await dbUtils.get.password(username);
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
        },
        threads: async () => {
            let dbResponse = await dbUtils.get.threads();
            return dbResponse.rows;
        },
        posts: async (thread) => {
            let dbResponse = await dbUtils.get.posts(thread);
            return dbResponse.rows;
        },
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
        thread: async (token, username, threadName) => {
            if (username === ADMIN) {
                if (await utilsNew.check.token(username, token)) {
                    let inserted =  await dbUtils.create.thread(threadName);
                    if (inserted){
                        return await dbUtils.create.threadTable(threadName);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
            }
        },
        post: async (token, threadName, title, body) => {
            let username = await dbUtils.get.usernameByToken(token);
            if (await utilsNew.check.token(username.rows[0].username, token)) {
                let lastId = await dbUtils.get.postLastId(threadName);
                let inserted = await dbUtils.create.post(threadName, lastId.rows[0].id+1, username.rows[0].username, body, title, 1, 1);
                if (inserted) {
                    return await dbUtils.create.postTable(threadName, lastId.rows[0].id+1);
                }
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
        thread: async (token, username, threadName) => {
            if (username === ADMIN) {
                if (await utilsNew.check.token(username, token)) {
                    let tableDeleted = await dbUtils.delete.table(threadName);
                    if (tableDeleted) {
                        return await dbUtils.delete.thread(threadName);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
            }
        },
        post: async (token, threadName, postId) => {
            let username = await dbUtils.get.usernameByToken(token);
            let postOwner = await dbUtils.get.postOwner(threadName, postId);
            if (username.rows[0].username === postOwner.rows[0].owner) {
                let deleted = await dbUtils.delete.post(threadName, postId);
                if (deleted) {
                    return await dbUtils.delete.table(threadName+postId);
                }
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