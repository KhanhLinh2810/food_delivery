import mongoose from 'mongoose';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { ItemAttrs, ItemDoc } from '../item.model';
import { ItemService } from './item.service';

export class ItemControler {
	async create(data_body: ItemAttrs) {
		const checkName = await ItemService.getOne({
			name: data_body.name,
			restaurant_id: data_body.restaurant_id,
		});
		if (checkName) {
			throw new BadRequestError('item_name_is_exist');
		}
		return await ItemService.create(data_body);
	}

	async getMany() {
		return await ItemService.getMany({});
	}

	async getOne(id: string): Promise<ItemDoc> {
		const item = await ItemService.getOne({ id: id });
		if (!item) {
			throw new BadRequestError('item_not_found');
		}
		return item;
	}

	async update(id: string, data_body: ItemAttrs): Promise<ItemDoc> {
		const item = await this.getOne(id);
		item.set(data_body);
		await item.save();
		return item;
	}

	async destroy(id: string): Promise<ItemDoc> {
		const item = await ItemService.deleteById(id);
		if (!item) {
			throw new BadRequestError('item_not_found');
		}
		return item;
	}
}
