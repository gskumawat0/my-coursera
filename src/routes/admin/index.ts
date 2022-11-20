import express from 'express';
import routes from '../../controllers/admin';

const router = express.Router();

router.route('/courses').get().post();
router.route('/courses/:courseId').get().put().delete();

export default router;
