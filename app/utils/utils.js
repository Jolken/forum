/*
    DB abstraction with helpful functions,
    such as:
        get/delete/create post/thread/comment/user
        check token/password/username
        login
*/
const crypto = require('crypto');
/*
Other utils to work with DB
*/
const dbUtils = require(APP_ROOT + '/app/utils/dbUtils');
const pg = require('pg');
const dbConfig = require(APP_ROOT + '/config/db.js');
const pool = new pg.Pool(dbConfig);
//there are only one admin ^⨀ᴥ⨀^
const ADMIN = 'jolken';

const utilsNew = {
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
        /*
        check given password with password in DB
        */
        password: async (username, password) => {
            let dbResponse = await dbUtils.get.password(username);
            
            try {
                return password == dbResponse.rows[0].pass;
            }
            catch (e) {
                return 0;
            }
        },
        
        usernameAvailable: async (username) => {
            let dbResponse = await dbUtils.get.username(username);
            /*
                it will be an exception, if user not exist
            */
            try {
                return username != dbResponse.rows[0].username;
            }
            catch (e) {
                return 1;
            }
        },
        
        /*
        check given token with token in DB
        */
        token: async (username, token) => {
            let dbResponse = await dbUtils.get.token(username);
        
            try {
                return token == dbResponse.rows[0].token;
            }
            catch (e) {
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

        postsId: async (thread) => {
            let dbResponse = await dbUtils.get.posts(thread);

            return dbResponse.rows;
        },
        
        post: async (thread, id) => {
            let dbResponse = await dbUtils.get.post(thread, id);
        
            return dbResponse.rows[0];
        },
        
        comments: async (thread, id) => {
            let dbResponse = await dbUtils.get.comments(thread, id);
        
            return dbResponse.rows;
        }
    },

    new: {
        user: async (username, password, email) => {
            if (await utilsNew.check.usernameAvailable(username)) {
                                                      //username, password, token, lvl, date, email
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
                    /*
                            insert new thread into thread table
                    */
                    let inserted =  await dbUtils.create.thread(threadName);
                    if (inserted){
                        /*
                                create table with posts
                        */
                       let table =  await dbUtils.create.threadTable(threadName);
                       if (table) {
                           return dbUtils.create.post(threadName, 0, 0, 0, 0, 0, 4);
                       }
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
                let lastId = await dbUtils.get.lastId(threadName);
                /*
                            insert post in thread table
                                                         threadName, id, username, text of post, title, date, min lvl to comment
                */
                let inserted = await dbUtils.create.post(threadName, lastId.rows[0].id+1, username.rows[0].username, body, title, 1, 1);
                if (inserted) {
                    /*
                            creates table with comments
                                                          theradName, postID
                    */
                    return await dbUtils.create.postTable(threadName, lastId.rows[0].id+1);
                }
            }
        },
        comment: async (token, threadName, postId, body) => {
            let username = await dbUtils.get.usernameByToken(token);
            if (await utilsNew.check.token(username.rows[0].username, token)) {
                let lastId = await dbUtils.get.lastId(threadName+postId);
                return await dbUtils.create.comment(threadName, postId, username.rows[0].username, body, 1, lastId.rows[0].id + 1);
            }
        },

    },

    delete: {
        comment: async (token, threadName, postId, commentId) => {
            let username = await dbUtils.get.usernameByToken(token);
            if (await utilsNew.check.token(username.rows[0].username, token)) {
                return await dbUtils.delete.comment(threadName, postId, commentId);
            }
        },

        comments: async (thread, postId) => {
            let dbResponse = await dbUtils.delete.comments(thread, postId);
            return dbResponse;
        },

        /*
        !
        !       NEED REWRITE
        !
        */
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
        
        /*
        !
        !       DELETE COMMENTS
        !
        */
        thread: async (token, username, threadName) => {
            if (username === ADMIN) {
                if (await utilsNew.check.token(username, token)) {
                    let postsId = await utilsNew.get.postsId(threadName);
                    let test = postsId.forEach(async (id) => {
                        if (id.id >= 1) {
                            return await utilsNew.delete.postNoCheck(threadName, id.id);
                        }
                        else {
                            return 0;
                        }
                    });
                    
                    
                    let tableDeleted = await dbUtils.delete.table(threadName);
                    if (tableDeleted) {
                        /*
                            delete from thread table
                        */
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
        /*
        !
        !   NEED REWRITE
        !
        */
        post: async (token, threadName, postId) => {
            let username = await dbUtils.get.usernameByToken(token);
            let postOwner = await dbUtils.get.postOwner(threadName, postId);
            
            if ((username.rows[0].username === postOwner.rows[0].owner) || (username.rows[0].username === ADMIN)) {
                let deletedComments = await utilsNew.delete.comments(threadName, postId);
                let deletedFromThread = await dbUtils.delete.post(threadName, postId);
                
                if (deletedFromThread) {
                    return await dbUtils.delete.table(threadName+postId);
                }
            }
        },
        postNoCheck: async (threadName, postId) => {
            let deletedComments = await utilsNew.delete.comments(threadName, postId);
            let deletedFromThread = await dbUtils.delete.post(threadName, postId);
    
            if (deletedFromThread) {
                return await dbUtils.delete.table(threadName + postId);
            }
        },
    },

    generate: {
        token: async (username) => {
            /*
                the best security in the world =D
            */
            let token = crypto.randomBytes(256).toString('hex');
            if (await dbUtils.update.token(username, token)) {
                return token;
            }
            return 0;
        },
    },
};

module.exports = utilsNew;