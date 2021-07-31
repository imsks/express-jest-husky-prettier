import { Router } from 'express';
import { getAllCountries, queryDataFromJSONFile } from '../controllers';

const indexRouter = Router();
indexRouter.route('/countries').get(getAllCountries);
indexRouter.route('/country/:name').get(queryDataFromJSONFile);

export default indexRouter;
