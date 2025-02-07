import { ItemOptionAttrs } from '../item_option.model';
import { ItemOptionService } from './item_option.service';

export class ItemOptionController {
	create = async (data_body: ItemOptionAttrs) => {
		return await ItemOptionService.create(data_body);
	};
}
