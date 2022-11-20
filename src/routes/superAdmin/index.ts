import express from 'express';
import * as controller from '../../controllers/superAdmin';

const router = express.Router();

router.route('/courses').get(controller.getCourses);
router.route('/courses/:courseId/review').put(controller.reviewCourse);

export default router;
