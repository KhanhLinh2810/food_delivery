import { NextFunction, Request, Response, Router } from 'express';
import { ItemControler } from './item.controller';
import { ItemAttrs } from '../item.model';
import { resOk } from '../../../utilities/response.util';

export class ItemRouter {
	private controller = new ItemControler();

	init(router: Router) {
		const ItemRouter = Router();

		ItemRouter.post('/', this.create);
		ItemRouter.get('/', this.index);
		ItemRouter.get('/:id', this.detail);
		ItemRouter.put('/:id', this.update);
		ItemRouter.delete('/:id', this.delete);

		router.use('/item', ItemRouter);
	}
	// create
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data_body: ItemAttrs = req.body;
			const item = await this.controller.create(data_body);
			return res.status(200).json(resOk(item));
		} catch (error) {
			next(error);
		}
	}

	// read
	async index(req: Request, res: Response, next: NextFunction) {
		try {
		} catch (error) {
			next(error);
		}
	}

	async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const item = await this.controller.getOne(id);
			return res.status(200).json(resOk(item));
		} catch (error) {
			next(error);
		}
	}

	//update
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const data_body = req.body;
			const item = await this.controller.update(id, data_body);
			return res.status(200).json(resOk(item));
		} catch (error) {
			next(error);
		}
	}

	//delete
	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			const item = await this.controller.destroy(id);
			return res.status(200).json(resOk(item));
		} catch (error) {
			next(error);
		}
	}

	buildFilter(req: Request) {
		return {};
	}
}
