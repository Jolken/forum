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
    if (deleted) {
        res.send({
            'status': "delete succesful",
        });
    }
    else {
        res.send({
            status: "can't delete",
        });
    }
});
/*
delete thread, too :D
*/
router.delete('/:threadName', async (req, res) => {
    let threadName = req.params.threadName || req.body.name;
    let deleted = await utils.delete.thread(req.body.token, req.body.user, threadName);
    if (deleted) {
        res.send({
            'status': "delete succesful",
        });
    }
    else {
        res.send({
            status: "can't delete",
        });
    }
});
/*
get posts in thread
*/
router.get('/:threadName/', async (req, res) => {
    let posts = await utils.get.posts(req.params.threadName);
    if (posts) {
        res.send({
            'status': "success",
            'data': posts
        });
    }
    else {
        res.send({
            status: "can't delete",
        });
    }
});
/*
new post
*/
router.post('/:threadName/', async (req, res) => {
    let created = await utils.new.post(req.body.token, req.params.threadName, req.body.title, req.body.body);
    if (created) {
        res.send({
            'status': "create succesful",
        });
    }
    else {
        res.send({
            status: "can't create",
        });
    }
});
/*
delete post
*/
router.delete('/:threadName/:postId/', async (req, res) => {
    let deleted = await utils.delete.post(req.body.token, req.body.user, req.params.threadName, req.params.postId);
    if (deleted) {
        res.send({
            'status': "delete succesful",
        });
    }
    else {
        res.send({
            status: "can't delete",
        });
    }
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

/*
new comment
*/
router.post('/:threadName/:postId/', async (req, res) => {
    let created = await utils.new.comment(req.body.token, req.params.threadName, req.params.postId, req.body.body);
    if (created) {
        res.send({
            'status': "create succesful",
        });
    }
    else {
        res.send({
            status: "can't create",
        });
    }
});

/*
delete comment
*/
router.delete('/:threadName/:postId/:commentId', async (req, res) => {
    let deleted = await utils.delete.comment(req.body.token, req.params.threadName, req.params.postId, req.params.commentId);
    if (deleted) {
        res.send({
            'status': "delete succesful",
        });
    }
    else {
        res.send({
            status: "can't delete",
        });
    }
});