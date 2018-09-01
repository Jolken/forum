var utils = require(APP_ROOT + '/app/utils/utils');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('main page');
    });

    app.post('/auth/login', (req,res) => {
        let login = (res, check) => {
            if (check) {
                let token = utils.generate.token(req.body.user);
                res.send(token);
            }
            else {
                res.send('incorrect data');
            }
        };
        utils.check.password(req.body.user, req.body.pass, login, res);
    });

    app.post('/auth/register');
    
    app.put('/auth/update');
    
    app.delete('/auth/delete');


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