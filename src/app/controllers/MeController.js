const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
    storedCourse(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-course', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    trashCourse(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-course', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
