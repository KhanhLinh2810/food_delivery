import { IItemFilter } from '../../../interface/item.interface';
import { Item, ItemAttrs, ItemDoc } from '../item.model';

async function create(data_body: ItemAttrs): Promise<ItemDoc> {
	const item = Item.build(data_body);
	await item.save();
	return item;
}

async function getOne(condition: any): Promise<ItemDoc | null> {
	return await Item.findOne(condition);
}

async function getMany(query: object): Promise<ItemDoc[]> {
	return await Item.find(query);
}

async function deleteById(id: string): Promise<ItemDoc | null> {
	return await Item.findByIdAndDelete(id);
}

// other function
function buildQuery(filter: IItemFilter): Object {
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
