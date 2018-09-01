const pg = require('pg');
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);
module.exports = {
    compare: {
        password: (username, password, login, response) => {
            pool.query(`SELECT pass FROM users WHERE username = '${username}'`)
                .then(res => {
                    login(response, res.rows[0].pass === password);
                })
                .catch(err => {
                    login(response, false);
                });

        },
        username: () => {

        },
        token: () => {

        }

    },
    get: {
        user: () => {

        },
        post: () => {

        },
        comment: () => {

        },
        thread: () => {

        }
    },
    create: {
        user: () => {

        },
        post: () => {

        },
        comment: () => {

        },
        thread: () => {

        }
    },
    update: {
        user: () => {

        },
        post: () => {

        },
        comment: () => {

        },
        thread: () => {

        },
        token: (username, token) => {
            pool.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
                .then()
                .catch(err => console.log(err));
        },
    },
    delete: {
        user: () => {

        },
        post: () => {

        },
        comment: () => {

        },
        thread: () => {


        }

    }
}