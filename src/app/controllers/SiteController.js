const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home', {
                    course: multipleMongooseToObject(course),
                });
            })

            .catch((error) => next(error));
        // res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
