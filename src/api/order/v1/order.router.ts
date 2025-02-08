import { NextFunction, Request, Response, Router } from 'express';
import { OrderController } from './order.controller';
import { OrderAttrs } from '../order.model';
import { resOk } from '../../../utilities/response.util';
import { validateBodyRed } from '../../../middlewares/validation.middleware';
import { CreateOrderRequest } from '../request/create-order.request';

export class OrderRouter {
	private controller = new OrderController();

	public init(router: Router) {
		const OrderRouter = Router();
		OrderRouter.post(
			'/',
			validateBodyRed(CreateOrderRequest),
			this.create.bind(this),
		);

		router.use('/order', OrderRouter);
	}

	//create
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: OrderAttrs = req.body;
			const order = await this.controller.create(data_body);

			return res.status(200).json(resOk(order));
		} catch (err) {
			next(err);
		}
	}
}
