import { Router } from 'express';
import { getDashboardData } from '../../controllers/user/dashboard';

const userProfileRouter = Router();
userProfileRouter.route('/').get(getDashboardData);

export default userProfileRouter;
