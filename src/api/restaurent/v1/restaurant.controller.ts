import { BadRequestError } from '../../../common/errors/bad-request-error';
import { NotFoundError } from '../../../common/errors/not-found-error';
import { IPagination } from '../../../interface/pagination.interface';
import { IRestaurantFilter } from '../../../interface/restaurant.interface';
import { EncUtil } from '../../../utilities/encryption.util';
import { RestaurantAttrs, RestaurantDoc } from '../restaurent.model';
import { RestaurantService } from './restaurant.service';

export class RestaurantController {
	async create(data_body: RestaurantAttrs): Promise<RestaurantDoc> {
		const checkPhone = await RestaurantService.getOne({
			phone: data_body.phone,
		});
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}
		if (data_body.password)
			data_body.password = await EncUtil.createHash(data_body.password);

		const restaurant = await RestaurantService.create(data_body);
		return restaurant;
	}
	async getOne(id: number): Promise<RestaurantDoc> {
		const restaurant = await RestaurantService.getOne({ id: id });
		if (!restaurant) {
			throw new NotFoundError('restaurant_not_found');
		}
		return restaurant;
	}
	async getMany(
		filter: IRestaurantFilter,
		paging: IPagination,
	): Promise<{ count: number; rows: RestaurantDoc[] }> {
		const query = RestaurantService.buildQuery(filter);
		return await RestaurantService.getMany(query, paging);
	}
	async update(
		id: number,
		data_body: RestaurantAttrs,
	): Promise<RestaurantDoc> {
		const restaurant = await RestaurantService.getOne({ id: id });
		if (!restaurant) {
			throw new NotFoundError('restaurant_not_found');
		}
		if (restaurant.phone !== data_body.phone) {
			const checkPhone = await RestaurantService.getOne({
				phone: data_body.phone,
			});
			if (checkPhone) {
				throw new BadRequestError('phone_exist');
			}
		}
		if (data_body.password) {
			data_body.password = await EncUtil.createHash(data_body.password);
		}
		await restaurant.save();
		return restaurant;
	}
	async destroy(id: number) {
		const restaurant = await RestaurantService.deleteById(id);
		if (!restaurant) {
			throw new NotFoundError('restaurant_not_found');
		}
		return restaurant;
	}
}
