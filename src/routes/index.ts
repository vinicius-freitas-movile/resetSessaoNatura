import { Router } from 'express';
import resetRouter from './reset.routes';

const routes = Router();

routes.use('/', resetRouter);

export default routes;