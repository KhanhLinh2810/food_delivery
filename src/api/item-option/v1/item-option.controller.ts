import { BadRequestError } from '../../../common/errors/bad-request-error';
import { ItemOptionAttrs } from '../item-option.model';
import { ItemOptionService } from './item-option.service';

export class ItemOptionController {
	create = async (data_body: ItemOptionAttrs) => {
		const checkName = await ItemOptionService.getOne({
			name: data_body.name,
			restaurant_id: data_body.restaurant_id,
		});
		if (checkName) {
			throw new BadRequestError('item_option_name_is_exist');
		}
		return await ItemOptionService.create(data_body);
	};
}
