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

export const ItemOptionService = {
	create,
};
