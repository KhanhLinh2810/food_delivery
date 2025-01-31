import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from './user.controller';
import { UserAttrs } from '../user.model';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { resOk } from '../../../utilities/response.util';
import { validateBodyRed } from '../../../middlewares/validation.middleware';
import {
	parseSafeInterger,
	toSafeInteger,
	toSafeString,
} from '../../../utilities/data.utils';
import { paginate } from '../../../utilities/paginate.util';
import { IUserFilter } from '../../../interface/user.interface';
import { CreateUserRequest } from '../request/create_user.request';

export class UserRouter {
	private UserController = new UserController();

	public init(router: Router) {
		const userRouter = Router();

		userRouter.post(
			'/register',
			validateBodyRed(CreateUserRequest),
			this.create,
		);
		userRouter.get('/', this.index);
		userRouter.get('/:id', this.detail);
		userRouter.put('/:id', this.update);
		userRouter.delete('/:id', this.delete);

		router.use('/user', userRouter);
	}
	// create
	private async create(req: Request, res: Response, next: NextFunction) {
		try {
			console.log('-------------------------------');
			const data_body: UserAttrs = req.body;
			const user = await this.UserController.create(data_body);
			console.log('-------------------------------');
			return res.status(200).json(resOk(user));
		} catch (error) {
			next(error);
		}
	}

	// read
	private async index(req: Request, res: Response, next: NextFunction) {
		try {
			const { page, limit, offset, sort_by, sort_order } = paginate(req);
			const filter = this.buildFilter(req);

			const data = await this.UserController.getMany(filter, {
				limit,
				offset,
				sort_by,
				sort_order,
			});
			return res
				.status(200)
				.json(
					resOk(
						data.rows,
						'success',
						data.count,
						limit,
						page,
						limit ? data.count / limit + 1 : 0,
					),
				);
		} catch (error) {
			next(error);
		}
	}

	private async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const user = await this.UserController.getOne(id);
			return res.status(200).json(resOk(user));
		} catch (error) {
			next(error);
		}
	}

	//update
	private async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const data_body: UserAttrs = req.body;
			const user = await this.UserController.update(id, data_body);
			return res.status(200).json(resOk(user));
		} catch (error) {
			next(error);
		}
	}

	// delete
	private async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const user = await this.UserController.destroy(id);
			return res.status(200).json(resOk(user));
		} catch (error) {
			next(error);
		}
	}

	// other function
	buildFilter(req: Request): IUserFilter {
		return {
			keyword: toSafeString(req.body.keyword),

			phone: toSafeString(req.body.phone),
			email: toSafeString(req.body.email),
			user_name: toSafeString(req.body.user_name),
			first_name: toSafeString(req.body.first_name),
			last_name: toSafeString(req.body.last_name),
			citizen_id: toSafeString(req.body.citizen_id),
			status: parseSafeInterger(req.body.status) ?? undefined,
			type: parseSafeInterger(req.body.type) ?? undefined,

			lower_score: parseSafeInterger(req.body.lower_score) ?? undefined,
			higher_score: parseSafeInterger(req.body.lower_score) ?? undefined,
			name: toSafeString(req.body.name),
			address: toSafeString(req.body.address),
		} as IUserFilter;
	}
}
