import express, { Router } from 'express';
import { AuthRouter } from '../../api/auth/v1/auth.router';

export class PublicRouter {
	public static init(app: express.Application, router: express.Router) {
		new AuthRouter().init(router);
		app.use('/api/v1/public', router);
	}
}
