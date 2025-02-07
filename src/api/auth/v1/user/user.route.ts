import { NextFunction, Request, Response, Router } from 'express';
import { validateBodyRed } from '../../../../middlewares/validation.middleware';
import { RegisterRequest } from '../../request/register.request';
import { LoginRequest } from '../../request/login.request';
import { UserAttrs } from '../../../user/user.model';
import { resOk } from '../../../../utilities/response.util';
import { ILoginInterface } from '../../../../interface/auth.interface';
import { UserController } from './user.controller';

export class UserRouter {
	private controller = new UserController();

	public init(router: Router): void {
		const UserRouter = Router();

		UserRouter.post(
			'/register',
			validateBodyRed(RegisterRequest),
			this.register.bind(this),
		);
		UserRouter.post(
			'/login',
			validateBodyRed(LoginRequest),
			this.login.bind(this),
		);

		router.use('/user', UserRouter);
	}

	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: UserAttrs = req.body;
			const user = await this.controller.register(data_body);
			return res.status(200).json(resOk(user));
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
