import express from 'express';
import passport from 'passport';
import * as controller from '../../controllers/employees';

const router = express.Router();

router.use(passport.authenticate('employee', { session: false }));

router.route('/courses').get(controller.getCourses);
router
	.route('/courses/:courseId/progress')
	.post(controller.startCourse)
	.put(controller.updateProgress)
	.delete(controller.deleteProgress);

router.route('/courses/:courseId/rewards/:rewardId/claim').post(controller.claimReward);

export default router;
