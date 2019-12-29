import express from 'express';
import statsCtrl from '../controllers/stats.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/events').get(statsCtrl.getUniqueEvents)

export default router;