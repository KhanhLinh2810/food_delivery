import { Application, Router } from 'express';
import { RestaurantRouter } from '../../api/restaurent/v1/restaurant.route';
import { ItemOptionRouter } from '../../api/item-option/v1/item-option.route';
import { verifyToken } from '../../middlewares/auth.middlewares';

export class OwnRestaurantRouter {
	public static init(app: Application, router: Router) {
		new RestaurantRouter().init(router);
		new ItemOptionRouter().init(router);
		app.use('/api/v1/owner', verifyToken, router);
	}
}
