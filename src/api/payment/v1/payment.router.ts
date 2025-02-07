import { NextFunction, Request, Response, Router } from 'express';
import { resOk } from '../../../utilities/response.util';
import { PaymentController } from './payment.controller';

export class PaymentRouter {
	private controller = new PaymentController();

	constructor() {
		this.controller = new PaymentController(); // Initialize in the constructor
	}

	public init(router: Router) {
		const PaymentRouter = Router();

		PaymentRouter.post('/', this.create.bind(this));
		PaymentRouter.post('/refund', this.refund.bind(this));
		PaymentRouter.post('/confirm', this.confirm.bind(this));

		router.use('/payment', PaymentRouter);
	}
	// create
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.controller.create();
			return res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	// read
	async refund(req: Request, res: Response, next: NextFunction) {
		try {
			const { payment_intent_id } = req.body;
			const data = await this.controller.refund(payment_intent_id);
			return res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	async confirm(req: Request, res: Response, next: NextFunction) {
		try {
			const { payment_intent_id } = req.body;
			const item = await this.controller.confirm(payment_intent_id);
			return res.status(200).json(item);
		} catch (error) {
			next(error);
		}
	}
}
