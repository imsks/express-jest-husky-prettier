import { Router } from 'express';
import { getAllCountries } from '../controllers';

const indexRouter = Router();
indexRouter.route('/countries').get(getAllCountries);

export default indexRouter;
