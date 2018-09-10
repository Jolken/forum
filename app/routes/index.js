const forumRoutes = require('./forumRoutes');
const auth = require('./auth');  
const threads = require('./threads');
module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/threads', threads);
};