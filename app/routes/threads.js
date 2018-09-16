/*
    this code handle request with:
        posts
        comments
        threads
*/
const utils = require(APP_ROOT + '/app/utils/utils');
const Router = require('express-promise-router');
const router = new Router();
module.exports = router;
/*
get threads
*/
router.get('/', async (req, res) => {
    let threads = await utils.get.threads();
    res.send(threads);
});
/*
new thread
*/
router.post('/', async (req, res) => {
    let newThread = await utils.new.thread(req.body.token, req.body.user, req.body.name);
    res.send(newThread);

});
/*
delete thread
*/
router.delete('/', async (req, res) => {
    let threadName = req.params.threadName || req.body.name;
    let deleted = await utils.delete.thread(req.body.token, req.body.user, threadName);
    res.send(deleted);
});
/*
delete thread, too :D
*/
router.delete('/:threadName', async (req, res) => {
    let threadName = req.params.threadName || req.body.name;
    let deleted = await utils.delete.thread(req.body.token, req.body.user, threadName);
    res.send(deleted);
});
/*
get posts in thread
*/
router.get('/:threadName/', async (req, res) => {
    let posts = await utils.get.posts(req.params.threadName);
    res.send(posts);
});
/*
new post
*/
router.post('/:threadName/', async (req, res) => {
    let created = await utils.new.post(req.body.token, req.params.threadName, req.body.title, req.body.text);
    res.send(created);
});
/*
delete post
*/
router.delete('/:threadName/:postId/', async (req, res) => {
    let deleted = await utils.delete.post(req.body.token, req.params.threadName, req.params.postId);
    res.send(deleted);
});
/*
get comments
*/
router.get('/:threadName/:postId/', async (req, res) => {
    let postNComments = {
        post: await utils.get.post(req.params.threadName, req.params.postId),
        comments: await utils.get.comments(req.params.threadName, req.params.postId),
    }
    res.send(postNComments);
});
