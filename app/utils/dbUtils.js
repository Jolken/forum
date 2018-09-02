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


    },
    create: {
        user: (username, password, token, lvl, date, email, success) => {
            pool.query(`INSERT INTO users VALUES ('${username}','${password}','${token}',${lvl},${date},'${email}');`)
                .then(res => {
                    success(1);
                })
                .catch(err => {
                    success(0);
                });
        }

    },
    update: {

        token: (username, token) => {
            pool.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
                .then()
                .catch(err => console.log(err));
        },
    },
    delete: {


    }
}