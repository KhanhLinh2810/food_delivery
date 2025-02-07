import { Application, Router } from 'express';
import { RestaurantRouter } from '../../api/restaurent/v1/restaurant.route';
import { ItemOptionRouter } from '../../api/item_option/v1/item_option.route';

export class OwnRestaurantRouter {
	public static init(app: Application, router: Router) {
		new RestaurantRouter().init(router);
		new ItemOptionRouter().init(router);
		app.use('/api/v1/owner', router);
	}
}
