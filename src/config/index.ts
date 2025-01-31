import express from 'express';
import { connectToDatabase } from './database.conf';
import { ApplicationConfig } from './app.conf';
import { PublicRouter } from './routers/public.router.conf';
import { NotFoundError } from '../common/errors/not-found-error';
import { ErrorHandler } from '../middlewares/error-handler.middleware';
import { OwnRestaurantRouter } from './routers/restaurant.router.conf';

export class Config {
	public static async init(): Promise<express.Application> {
		const app = express();
		const router = express.Router();

		await connectToDatabase();

		ApplicationConfig.init(app);

		PublicRouter.init(app, router);
		OwnRestaurantRouter.init(app, router);

		app.all('*', (req, res, next) => {
			next(new NotFoundError());
		});

		app.use(ErrorHandler);

		return app;
	}
}
