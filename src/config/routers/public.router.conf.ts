import express, { Router } from 'express';

export class PublicRouter {
	public static init(app: express.Application, router: express.Router) {
		app.use('/public', router);
	}
}
