import { NextFunction, Request, Response, Router } from 'express';
import { AddressController } from './address.controller';
import { resOk } from '../../../utilities/response.util';
import { validateBodyRed } from '../../../middlewares/validation.middleware';
import { CreateAddressRequest } from '../request/create_address.request';
import { AddressAttrs } from '../address.model';

export class AddressRouter {
	private controller = new AddressController();

	public init(router: Router) {
		const addressRouter = Router();
		addressRouter.post(
			'/',
			validateBodyRed(CreateAddressRequest),
			this.create.bind(this),
		);
		addressRouter.get('/', this.index.bind(this));
		addressRouter.get('/:id', this.detail.bind(this));
		addressRouter.put('/:id', this.update.bind(this));
		addressRouter.delete('/:id', this.destroy.bind(this));

		router.use('/address', addressRouter);
	}

	//create
	private async create(req: Request, res: Response, next: NextFunction) {
		try {
			const user_id = req.user.id;
			const data_body: AddressAttrs = req.body;
			const address = await this.controller.create(data_body, user_id);
			return res.status(200).json(resOk(address));
		} catch (error) {
			next(error);
		}
	}

	//read
	private async index(req: Request, res: Response, next: NextFunction) {
		try {
			const user_id = req.user.id;
			const addresses = await this.controller.getMany(user_id);
			return res.status(200).json(resOk(addresses));
		} catch (error) {
			next(error);
		}
	}

	private async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const user_id = req.user.id;
			const address_id = req.params.id;
			const address = await this.controller.getOne(user_id, address_id);
			return res.status(200).json(resOk(address));
		} catch (error) {
			next(error);
		}
	}

	// update
	private async update(req: Request, res: Response, next: NextFunction) {
		try {
			const user_id = req.user.id;
			const address_id = req.params.id;
			const data_body: AddressAttrs = req.body;
			const address = await this.controller.update(
				data_body,
				user_id,
				address_id,
			);
			return res.status(200).json(resOk(address));
		} catch (error) {
			next(error);
		}
	}

	// delete
	private async destroy(req: Request, res: Response, next: NextFunction) {
		try {
			const user_id = req.user.id;
			const address_id = req.params.id;
			const address = await this.controller.delete(user_id, address_id);
			return res.status(200).json(resOk(address));
		} catch (error) {
			next(error);
		}
	}
}
