/*
    this code works only with users
*/
const utils = require(APP_ROOT + '/app/utils/utils');
const pg = require('pg');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.post('/login', async (req, res) => {
    let token = await utils.functions.login(req.body.username, req.body.password);
    if (token) {
        res.send({
            'status': "login succesful",
            'token': token,
        });

        res.sendStatus(200);
    }
    else {
        res.send({
            status: "can't login",
        });
        res.sendStatus(400);
    }
});

router.post('/register', async (req, res) => {
    let token = await utils.new.user(req.body.username, req.body.password, req.body.email);
    if (token) {
        res.send({
            'status': "register succesful",
            'token': token,
        });
        res.sendStatus(200);
    }
    else {
        res.send({
            status: "can't register",
        });
        res.sendStatus(400);
    }
});


router.delete('/delete', async (req, res) => {
    let deleted = await utils.delete.user(req.body.token, req.body.username, req.body.password);
    if (deleted) {
        res.send({
            'status': "delete succesful",
        });
        res.sendStatus(200);
    }
    else {
        res.send({
            status: "can't delete",
        });
        res.sendStatus(400);
    }
});

/*

router.put('', async (req, res) => {

});

*/