import express, { Router } from 'express';
import { RestaurantRouter } from '../../api/restaurent/v1/restaurant.route';

export class OwnRestaurantRouter {
	public static init(app: express.Application, router: express.Router) {
		new RestaurantRouter().init(router);
		app.use('/api/v1/restaurant', router);
	}
}
