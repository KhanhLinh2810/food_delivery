import { RestaurantDoc } from '../../api/restaurent/restaurant.model';
import { UserDoc } from '../../api/user/user.model';

declare global {
	namespace Express {
		interface Request {
			user: UserDoc;
			restaurant: RestaurantDoc;
		}
	}
}
