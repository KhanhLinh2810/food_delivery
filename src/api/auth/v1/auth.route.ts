import { Router } from 'express';
import { UserRouter } from './user/user.route';
import { RestaurantRouter } from './restaurant/restaurant.route';

export class AuthRouter {
	public init(router: Router): void {
		const authRouter = Router();
		new UserRouter().init(authRouter);
		new RestaurantRouter().init(authRouter);

		router.use('/auth', authRouter);
	}
}
