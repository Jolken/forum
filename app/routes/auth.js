var utils = require(APP_ROOT + '/app/utils/utils');
const pg = require('pg');
const Router = require('express-promise-router');
const router = new Router();
var dbConfig = require(APP_ROOT + '/config/db.js');
var pool = new pg.Pool(dbConfig);

module.exports = router;

router.post('/login', async (req, res) => {
    let token = await utils.functions.login(req.body.user, req.body.pass);
    res.send(token);
});

router.post('/register', async (req, res) => {
    let newUser = await utils.new.user(req.body.user, req.body.pass, req.body.email);
    res.send(newUser);

});


router.delete('/delete', async (req, res) => {
    let deleted = await utils.delete.user(req.body.user, req.body.token, req.body.pass);
    res.send(deleted);
});