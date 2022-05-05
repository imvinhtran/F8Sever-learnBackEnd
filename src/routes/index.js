const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const courseRouter = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/course', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
