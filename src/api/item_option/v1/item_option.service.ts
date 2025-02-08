import {
	ItemOption,
	ItemOptionAttrs,
	ItemOptionDoc,
} from '../item_option.model';

const create = async (data_body: ItemOptionAttrs): Promise<ItemOptionDoc> => {
	const option = ItemOption.build(data_body);
	await option.save();
	return option;
};

async function getOne(condition: any): Promise<ItemOptionDoc | null> {
	return await ItemOption.findOne(condition);
}

export const ItemOptionService = {
	create,
	getOne,
};
