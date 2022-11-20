import express from 'express';
import * as controller from '../../controllers/auth';

const router = express.Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/signin/token').post(controller.signinWithToken);

export default router;
