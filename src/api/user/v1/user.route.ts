import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from './user.controller';
import { UserAttrs } from '../user.model';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { resOk } from '../../../utilities/response.util';

export class UserRouter {
	private UserController = new UserController();

	init(route: Router) {
		const userController = new UserController();
		const userRouter = Router();

		route.use('/user', userRouter);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const dataBody: UserAttrs = req.body;
			const user = await this.UserController.create(dataBody);
			if (!user) {
				throw new BadRequestError('have error', 'have_error');
			}
			return res.status(201).send(resOk(user));
		} catch (error) {
			next(error);
		}
	}
}
