import express from 'express';
import routes from '../../controllers/employees';

const router = express.Router();

router.route('/courses').get();
router.route('/courses/:courseId/progress').post().put().delete();
router.route('/courses/:courseId/complete').put();

export default router;
