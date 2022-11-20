import express from 'express';
import * as controller from '../../controllers/admin';

const router = express.Router();

router.route('/courses').get(controller.getCourses).post(controller.addCourse);
router
	.route('/courses/:courseId')
	.get(controller.getCourse)
	.put(controller.updateCourse)
	.delete(controller.deleteCourse);

router.route('/courses/:courseId/topics').put(controller.updateCourseTopic);

export default router;
