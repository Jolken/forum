var utils = require(APP_ROOT + '/app/utils/utils');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.get('/:thread/', (req, res) => {
    let sendResponse = (data) => {
        res.send(data);
    }
    utils.get.thread(req.params.thread, sendResponse)
});

router.post('/:thread/', (req, res) => {
    res.send('Want to create new post in ' + req.params.thread + '?');

});

router.put('/:thread', (req, res) => {
    res.send('Wand to update ' + req.params.thread + '?');
});

router.delete('/:thread', (req, res) => {
    res.send('Wand to delete ' + req.params.thread + '?');
});