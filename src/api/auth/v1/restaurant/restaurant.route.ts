import { NextFunction, Request, Response, Router } from 'express';
import { validateBodyRed } from '../../../../middlewares/validation.middleware';
import { LoginRequest } from '../../request/login.request';
import { resOk } from '../../../../utilities/response.util';
import { ILoginInterface } from '../../../../interface/auth.interface';
import { RestaurantController } from '../restaurant/restaurant.controller';
import { RestaurantAttrs } from '../../../restaurent/restaurant.model';
import { CreateRestaurantRequest } from '../../../restaurent/request/create_restaurant.request';
import { upload } from '../../../../utilities/media.utils';

export class RestaurantRouter {
	private controller = new RestaurantController();

	public init(router: Router): void {
		const restaurantRouter = Router();

		restaurantRouter.post(
			'/register',
			upload.single('avatar'),
			validateBodyRed(CreateRestaurantRequest),
			this.register.bind(this),
		);
		restaurantRouter.post(
			'/login',
			validateBodyRed(LoginRequest),
			this.login.bind(this),
		);

		router.use('/restaurant', restaurantRouter);
	}

	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: RestaurantAttrs = req.body;
			const restaurant = await this.controller.register(data_body);
			return res.status(200).json(resOk(restaurant));
		} catch (error) {
			next(error);
		}
	}

	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: ILoginInterface = req.body;
			const token = await this.controller.login(data_body);
			return res.status(200).json(resOk(token));
		} catch (error) {
			next(error);
		}
	}
}
