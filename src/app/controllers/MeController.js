const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
    storedCourse(req, res, next) {
        let CourseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            CourseQuery = CourseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([CourseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/stored-course', {
                    deleteCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //     })
        //     .catch(() => {
        //     })
        // Course.find({})
        //     .then((courses) =>
        //         res.render('me/stored-course', {
        //             courses: multipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);
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
