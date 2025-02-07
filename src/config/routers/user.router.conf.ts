import { Application, Router } from 'express';
import { AccountUserRouter } from '../../api/user/v1/user.route';
import { verifyToken } from '../../middlewares/auth.middlewares';
import { AddressRouter } from '../../api/address/v1/address.router';

export class UserRouter {
	public static init(app: Application, router: Router) {
		new AddressRouter().init(router);
		new AccountUserRouter().init(router);
		app.use('/api/v1/user', verifyToken, router);
	}
}
