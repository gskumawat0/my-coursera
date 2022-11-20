import express from 'express';
import routes from '../../controllers/auth';

const router = express.Router();

router.route('/signup').post();
router.route('/signin').post();
router.route('/signin/token').post();

export default router;
