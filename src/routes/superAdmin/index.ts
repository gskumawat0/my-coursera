import express from 'express';
import routes from '../../controllers/superAdmin';

const router = express.Router();

router.route('/courses').get();
router.route('/courses/:courseId').get().put().delete();

export default router;
