import {Router} from 'express'
import {LocalityController} from './controller/LocalityController';

const localityController = new LocalityController();

const routes = Router();

routes.get('/json', localityController.show);
routes.get('/csv', localityController.show);
routes.get('/city/', localityController.index);

export default routes;