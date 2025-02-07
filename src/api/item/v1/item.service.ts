import { IItemInterface } from '../../../interface/item.interface';
import { Item, ItemAttrs, ItemDoc } from '../item.model';

async function create(data_body: ItemAttrs): Promise<ItemDoc> {
	const item = Item.build(data_body);
	await item.save();
	return item;
}

async function getOne(condition: any): Promise<ItemDoc | null> {
	return await Item.findOne(condition);
}

async function getMany(query: object) {
	return await Item.find(query);
}

async function deleteById(id: string) {
	return await Item.findByIdAndDelete(id);
}

// other function
async function buildQuery(filter: IItemInterface) {
	const query: any = {};
	if (filter.ids) {
		query._id = { $in: filter.ids };
	}
	return query;
}

export const ItemService = {
	create,
	getOne,
	getMany,
	deleteById,
	buildQuery,
};
