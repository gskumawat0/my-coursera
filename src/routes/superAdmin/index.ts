import express from 'express';
import passport from 'passport';
import * as controller from '../../controllers/superAdmin';

const router = express.Router();

router.use(passport.authenticate('superAdmin', { session: false }));

router.route('/courses').get(controller.getCourses);
router.route('/courses/:courseId/review').put(controller.reviewCourse);
router.route('/users/access-token').put(controller.generateSigninToken);

export default router;
