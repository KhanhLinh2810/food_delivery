import { Application, Router } from 'express';
import { AuthRouter } from '../../api/auth/v1/auth.route';
import { PaymentRouter } from '../../api/payment/v1/payment.router';
import { ItemRouter } from '../../api/item/v1/item.route';
import { OrderRouter } from '../../api/order/v1/order.router';

export class PublicRouter {
	public static init(app: Application, router: Router) {
		new AuthRouter().init(router);
		new PaymentRouter().init(router);
		new ItemRouter().init(router);
		new OrderRouter().init(router);
		app.use('/api/v1/public', router);
	}
}
