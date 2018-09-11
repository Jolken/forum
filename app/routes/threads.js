const utils = require(APP_ROOT + '/app/utils/utils');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
    let threads = await utils.get.threads();
    res.send(threads);
});

router.post('/', async (req, res) => {
    let newThread = await utils.new.thread(req.body.token, req.body.user, req.body.name);
    res.send(newThread);

});

router.delete('/', async (req, res) => {
    let threadName = req.params.threadName || req.body.name;
    let deleted = await utils.delete.thread(req.body.token, req.body.user, threadName);
    res.send(deleted);
});

router.delete('/:threadName', async (req, res) => {
    let threadName = req.params.threadName || req.body.name;
    let deleted = await utils.delete.thread(req.body.token, req.body.user, threadName);
    res.send(deleted);
});