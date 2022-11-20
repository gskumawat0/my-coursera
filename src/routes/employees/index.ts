import express from 'express';
import * as controller from '../../controllers/employees';

const router = express.Router();

router.route('/courses').get(controller.getCourses);
router
	.route('/courses/:courseId/progress')
	.post(controller.startCourse)
	.put(controller.updateProgress)
	.delete(controller.deleteProgress);

router.route('/courses/:courseId/rewards/:rewardId/claim').post(controller.claimReward);

export default router;
