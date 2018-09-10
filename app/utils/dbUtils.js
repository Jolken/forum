const pg = require('pg');
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);
module.exports = {
    get: {
        usernameByToken: (token) => {
            return pool.query(`SELECT username FROM users WHERE token = '${token}'`)
            
        },
        username: async (username) => {
            return await pool.query(`SELECT username FROM users WHERE username = '${username}'`)

        },
        password: async (username) => {
            return await pool.query(`SELECT pass FROM users WHERE username = '${username}'`)

        },
        token: async (username) => {
            return await pool.query(`SELECT token FROM users WHERE username = '${username}'`)

        },
        threads: () => {
            return  pool.query(`SELECT * FROM threads;`)

        },
        thread: (name,) => {
            return pool.query(`SELECT * FROM ${name}`)

        },
        threadName: (name,) => {
            return pool.query(`SELECT name FROM threads WHERE name = '${name}';`)

        },
        postLastId: (thread,) => {
            return pool.query(`'SELECT id FROM ${thread} ORDER BY id DESC LIMIT 1;`)

        },
        userLvl : (name,) => {
            return pool.query(`SELECT lvl FROM users WHERE username = '${name}'`)

        }



    },
    create: {
        user: async (username, password, token, lvl, date, email,) => {
            return await pool.query(`INSERT INTO users VALUES ('${username}','${password}','${token}',${lvl},${date},'${email}');`)
            //    .then(res => {
            //       (1);
            //    })
            //    .catch(err => {
            //       (0);
            //    });
        },
        thread: (name,) => {
            return pool.query(`INSERT INTO threads VALUES ('${name}');`)
            //    .then(res =>(1))
            //    .catch(err =>(0));
        },
        table: (name,) => {
            return pool.query(`CREATE TABLE ${name} (
                        	id		serial,
                        	owner 	text,
                        	body	text,
                        	title	text,
                        	date	int,
                        	minlvl	smallint
                        );`)
                //.then(res =>(1))
                //.catch(err =>(0));
        },


    },
    update: {
        token: async (username, token) => {
            return pool.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
            //    .then()
            //    .catch(err => console.log(err));
        },
    },
    delete: {
        user: async (username,) => {
            return await pool.query(`DELETE FROM users WHERE username = '${username}'`)
            //    .then(res =>(res))
            //    .catch(err =>(err));
        },

    }
}