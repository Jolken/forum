var utils = require(APP_ROOT + '/app/utils/utils');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('main page');
});

router.post('/auth/login', (req, res) => {
    let success = (check) => {
        if (check) {
            let token = utils.generate.token(req.body.user);
            res.send(token);
        }
        else {
            res.send('incorrect data');
        }
    };
    utils.check.password(req.body.user, req.body.pass, success);
});

router.post('/auth/register', (req, res) => {
    console.log(utils.check.password(req.body.user, req.body.pass));
    res.send('asdasd');
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

router.delete('/auth/delete', (req, res) => {
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
});


router.get('/threads/', (req, res) => {
    let sendResponse = (data) => {
        res.send(data);
    }
    utils.get.threads(sendResponse)
});

router.get('/threads/:thread/', (req, res) => {
    let sendResponse = (data) => {
        res.send(data);
    }
    utils.get.thread(req.params.thread, sendResponse)
});

router.get('/threads/:thread/:id', (req, res) => {
    res.send({ 'thread': req.params.thread, 'id': req.params.id });
});

router.get('/users/:id', (req, res) => {
    res.send({ 'id': req.params.id });
});


router.post('/threads/', (req, res) => {
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

router.post('/threads/:thread/', (req, res) => {
    res.send('Want to create new post in ' + req.params.thread + '?');

});

router.post('/threads/:thread/:id', (req, res) => {
    res.send('Want to create new comment in ' + req.params.id + '?');
});


router.put('/threads/:thread', (req, res) => {
    res.send('Wand to update ' + req.params.thread + '?');
});

router.put('/threads/:thread/:id', (req, res) => {
    res.send('Wand to update ' + req.params.id + ' in ' + req.params.thread + '?');
});

router.put('/threads/:thread/:id/:comment', (req, res) => {
    res.send('Wand to update ' + req.params.comment + ' in ' + req.params.id + '?');
});

router.put('/users/:user', (req, res) => {
    res.send('Wand to update ' + req.params.user + '?');
});


router.delete('/threads/:thread', (req, res) => {
    res.send('Wand to delete ' + req.params.thread + '?');
});

router.delete('/threads/:thread/:id', (req, res) => {
    res.send('Wand to delete ' + req.params.id + ' in ' + req.params.thread + '?');
});

router.delete('/threads/:thread/:id/:comment', (req, res) => {
    res.send('Wand to delete ' + req.params.comment + ' in ' + req.params.id + '?');
});

router.delete('/users/:user', (req, res) => {
    res.send('Wand to delete ' + req.params.user + '?');
});