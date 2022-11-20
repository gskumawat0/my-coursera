import express from 'express';
import authRoutes from './auth';
import employeesRoutes from './employees';
import adminRoutes from './admin';
import superAdminRoutes from './superAdmin';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);
router.use('/admin', adminRoutes);
router.use('/super-admin', superAdminRoutes);

export default router;
