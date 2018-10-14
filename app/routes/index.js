const auth = require('./auth');  
const threads = require('./threads');
module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/t', threads);
};