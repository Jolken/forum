var utils = require(APP_ROOT + '/app/utils/utils');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.get('/', (req, res) => {
    let sendResponse = (data) => {
        res.send(data);
    }
    utils.get.threads(sendResponse)
});

router.post('/', (req, res) => {
    let tokenCheck = (status) => {
        if (status) {
            utils.check.token(req.body.user, req.body.token, success);
        }
        else {
            res.send('thread exist');
        }
    };
    let success = (status) => {
        if (status) {
            utils.new.thread(req.body.name, created);
        }
        else {
            res.send('incorrect data');
        }
    };
    let created = (status) => {
        if (status) {
            res.send('thread created')
        }
        else {
            res.send('thread not created');
        }
    };
    utils.check.thread(req.body.name, tokenCheck);

});