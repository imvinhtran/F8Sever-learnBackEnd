const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/CourseController');

router.get('/create', newController.create);
router.post('/store', newController.store);
router.get('/:id/edit', newController.edit);
router.put('/:id', newController.update);
router.patch('/:id/restore', newController.restore);
router.delete('/:id', newController.destroy);
router.delete('/:id/force', newController.forceDestroy);
router.get('/:slug', newController.show);

module.exports = router;
