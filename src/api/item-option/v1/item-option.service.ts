import { IItemOptionFilter } from '../../../interface/item-option.interface';
import {
	ItemOption,
	ItemOptionAttrs,
	ItemOptionDoc,
} from '../item-option.model';

const create = async (data_body: ItemOptionAttrs): Promise<ItemOptionDoc> => {
	const option = ItemOption.build(data_body);
	await option.save();
	return option;
};

async function getOne(condition: any): Promise<ItemOptionDoc | null> {
	return await ItemOption.findOne(condition);
}

async function getMany(query: object): Promise<ItemOptionDoc[]> {
	return await ItemOption.find(query);
}

// other function
function buildQuery(filter: IItemOptionFilter): Object {
	const query: any = {};
	if (filter.ids) {
		query._id = { $in: filter.ids };
	}
	return query;
}

export const ItemOptionService = {
	create,
	getOne,
	getMany,
	buildQuery,
};
