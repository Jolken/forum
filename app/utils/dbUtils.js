const pg = require('pg');
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);
module.exports = {
    get: {
        username: (username, callback) => {
            pool.query(`SELECT username FROM users WHERE username = '${username}'`)
                .then(res => callback(res))
                .catch(err => callback(err));
        },
        password: (username, callback) => {
            pool.query(`SELECT pass FROM users WHERE username = '${username}'`)
                .then(res => callback(res))
                .catch(err => callback(err));
        },
        token: (username, callback) => {
            pool.query(`SELECT token FROM users WHERE username = '${username}'`)
                .then(res => callback(res))
                .catch(err => callback(err));
        },
        threads: (callback) => {
            pool.query(`SELECT * FROM threads;`)
                .then(res => callback(res))
                .catch(err => callback(err));
        },
        thread: (name, callback) => {
            pool.query(`SELECT * FROM ${name}`)
                .then(res => callback(res))
                .catch(err => callback(err))
        },
        threadName: (name, callback) => {
            pool.query(`SELECT name FROM threads WHERE name = '${name}';`)
                .then(res => callback(res))
                .catch(err => callback(err));
        }


    },
    create: {
        user: (username, password, token, lvl, date, email, callback) => {
            pool.query(`INSERT INTO users VALUES ('${username}','${password}','${token}',${lvl},${date},'${email}');`)
                .then(res => {
                    callback(1);
                })
                .catch(err => {
                    callback(0);
                });
        },
        thread: (name, callback) => {
            pool.query(`INSERT INTO threads VALUES ('${name}');`)
                .then(res => callback(1))
                .catch(err => callback(0));
        },
        table: (name, callback) => {
            pool.query(`CREATE TABLE ${name} (
                        	id		serial,
                        	owner 	text,
                        	body	text,
                        	title	text,
                        	date	int,
                        	minlvl	smallint
                        );`)
                .then(res => callback(1))
                .catch(err => callback(0));
        },


    },
    update: {
        token: (username, token) => {
            pool.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
                .then()
                .catch(err => console.log(err));
        },
    },
    delete: {
        user: (username, callback) => {
            pool.query(`DELETE FROM users WHERE username = '${username}'`)
                .then(res => callback(res))
                .catch(err => callback(err));
        },

    }
}