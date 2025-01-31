import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from './auth.controller';
import { UserAttrs } from '../../user/user.model';
import { resOk } from '../../../utilities/response.util';
import { ILoginInterface } from '../../../interface/auth.interface';
import { validateBodyRed } from '../../../middlewares/validation.middleware';
import { RegisterRequest } from './request/register.request';
import { LoginRequest } from './request/login.request';

export class AuthRouter {
	private controller = new AuthController();

	public init(router: Router): void {
		const AuthRouter = Router();

		AuthRouter.post(
			'/register',
			validateBodyRed(RegisterRequest),
			this.register,
		);
		AuthRouter.post('/login', validateBodyRed(LoginRequest), this.login);

		router.use('/auth', AuthRouter);
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
