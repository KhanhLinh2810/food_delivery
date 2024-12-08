import { Item, ItemAttrs, ItemDoc } from '../item.model';

async function create(data_body: ItemAttrs): Promise<ItemDoc> {
	const item = Item.build(data_body);
	await item.save();
	return item;
}

async function getOne(condition: any): Promise<ItemDoc | null> {
	return await Item.findOne({
		$where: condition,
	});
}

async function deleteById(id: string) {
	return await Item.findByIdAndDelete(id);
}

export const ItemService = {
	create,
	getOne,
	deleteById,
};
