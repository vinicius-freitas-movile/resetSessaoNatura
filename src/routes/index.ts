import { Router } from 'express';
import KarinaRouter from './karina.routes';

const routes = Router();

routes.use('/', KarinaRouter);

export default routes;