import { NextFunction, Request, Response, Router } from 'express';
import { ItemOptionController } from './item_option.controller';
import { ItemOptionAttrs } from '../item_option.model';
import { resOk } from '../../../utilities/response.util';
import { validateBodyRed } from '../../../middlewares/validation.middleware';
import { CreateItemOptionRequest } from '../request/create_item_option.request';

export class ItemOptionRouter {
	private controller = new ItemOptionController();

	public init(router: Router) {
		const itemOptionRouter = Router();

		itemOptionRouter.post(
			'/',
			validateBodyRed(CreateItemOptionRequest),
			this.create.bind(this),
		);

		router.use('/item-option', itemOptionRouter);
	}

	private async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: ItemOptionAttrs = req.body;
			data_body.restaurant_id = req.restaurant.id;
			const item_option = await this.controller.create(data_body);
			return res.status(200).json(resOk(item_option));
		} catch (error) {
			next(error);
		}
	}
}
