import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import statsRoutes from './stats.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /auth
router.use('/stats', statsRoutes);

/** GET * - default message */
router.get('*', (req, res) => res.send('OK'));

export default router;
