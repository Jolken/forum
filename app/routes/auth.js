var utils = require(APP_ROOT + '/app/utils/utils');
const pg = require('pg');
const Router = require('express-promise-router');
const router = new Router();
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);

module.exports = router;

router.post('/login', async (req, res) => {
    res.send(await utils.functions.login(req.body.user, req.body.pass));
});

router.post('/register', async (req, res) => {
    let newUser = await utils.new.user(req.body.user, req.body.pass, req.body.email);
    res.send(newUser);
    /*let success = (status) => {
        if (status) {
            let token = utils.generate.token(req.body.user);
            res.send(token);
        }
        else {
            res.send('bad request');
        }
    }
    utils.new.user(req.body.user, req.body.pass, req.body.email, success);*/
});

//router.put('/auth/update');

router.delete('/delete', async (req, res) => {
    res.send(await utils.delete.user(req.body.user, req.body.token, req.body.pass));
    /*
    let tokenCheck = (status) => {
        if (status) {
            utils.check.token(req.body.user, req.body.token, success);
        }
        else {
            res.send('incorrect data');
        }
    }
    let success = (status) => {
        if (status) {
            utils.remove.user(req.body.user, req.body.pass, req.body.token, deleted);
        }
        else {
            res.send('incorrect data');
        }
    };
    let deleted = (status) => {
        if (status) {
            res.send('deleted');
        }
        else {
            res.send('error');
        }
    }
    utils.check.password(req.body.user, req.body.pass, tokenCheck);
    */
});