var utils = require(APP_ROOT + '/app/utils/utils');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('main page');
    });

    app.post('/auth/login', (req,res) => {
        let login = (check) => {
            if (check) {
                let token = utils.generate.token(req.body.user);
                res.send(token);
            }
            else {
                res.send('incorrect data');
            }
        };
        utils.check.password(req.body.user, req.body.pass, login);
    });

    app.post('/auth/register', (req, res) => {
        let success = (status) => {
            if (status) {
                let token = utils.generate.token(req.body.user);
                res.send(token);
            }
            else {
                res.send('bad request');
            }
        }
        let uniqueUser = (isUniqe) => {
            if (isUniqe) {
                utils.new.user(req.body.user, req.body.pass, req.body.email, success);
            }
            else {
                res.send('error')
            }
        }
        utils.check.username(req.body.user, uniqueUser);
    });
    
    app.put('/auth/update');
    
    app.delete('/auth/delete', (req, res) => {
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
                res.send('deleted');
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


    app.get('/threads/', (req, res) => {
        res.send('threads');
    });

    app.get('/threads/:thread/', (req, res) => {
        res.send(req.params.thread);
    });

    app.get('/threads/:thread/:id', (req, res) => {
        res.send({'thread': req.params.thread, 'id' : req.params.id});
    });

    app.get('/users/:id', (req, res) => {
        res.send({ 'id': req.params.id });
    });


    app.post('/threads/', (req, res) => {
        res.send('Want to create new thread?');
    });

    app.post('/threads/:thread/', (req, res) => {
        res.send('Want to create new request in ' + req.params.thread + '?');
    });

    app.post('/threads/:thread/:id', (req, res) => {
        res.send('Want to create new comment in ' + req.params.id + '?');
    });

    app.post('/users/', (req, res) => {
        res.send('Want to create new user?');
    });


    app.put('/threads/:thread', (req, res) => {
        res.send('Wand to update ' + req.params.thread + '?');
    });

    app.put('/threads/:thread/:id', (req, res) => {
        res.send('Wand to update ' + req.params.id + ' in ' + req.params.thread + '?');
    });
    
    app.put('/threads/:thread/:id/:comment', (req, res) => {
        res.send('Wand to update ' + req.params.comment + ' in ' + req.params.id + '?');
    });

    app.put('/users/:user', (req, res) => {
        res.send('Wand to update ' + req.params.user + '?');
    });


    app.delete('/threads/:thread', (req, res) => {
        res.send('Wand to delete ' + req.params.thread + '?');
    });

    app.delete('/threads/:thread/:id', (req, res) => {
        res.send('Wand to delete ' + req.params.id + ' in ' + req.params.thread + '?');
    });

    app.delete('/threads/:thread/:id/:comment', (req, res) => {
        res.send('Wand to delete ' + req.params.comment + ' in ' + req.params.id + '?');
    });

    app.delete('/users/:user', (req, res) => {
        res.send('Wand to delete ' + req.params.user + '?');
    });
}