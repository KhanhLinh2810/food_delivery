import { BadRequestError } from '../../../common/errors/bad-request-error';
import { NotFoundError } from '../../../common/errors/not-found-error';
import { IPagination } from '../../../interface/pagination.interface';
import { IRestaurantFilter } from '../../../interface/restaurant.interface';
import { EncUtil } from '../../../utilities/encryption.util';
import { RestaurantAttrs, RestaurantDoc } from '../restaurant.model';
import { RestaurantService } from './restaurant.service';

export class RestaurantController {
	async create(data_body: RestaurantAttrs): Promise<RestaurantDoc> {
		const checkPhone = await RestaurantService.getOne({
			$or: [{ phone: data_body.phone }, { name: data_body.name }],
		});
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}
		if (data_body.password)
			data_body.password = await EncUtil.createHash(data_body.password);

		return await RestaurantService.create(data_body);
	}

	async getOne(id: string): Promise<RestaurantDoc> {
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
		id: string,
		data_body: RestaurantAttrs,
	): Promise<RestaurantDoc> {
		const restaurant = await this.getOne(id);
		if (restaurant.phone !== data_body.phone) {
			const checkPhone = await RestaurantService.getOne({
				phone: data_body.phone,
			});
			if (checkPhone) {
				throw new BadRequestError('phone_exist');
			}
		}
		if (restaurant.name !== data_body.name) {
			const checkName = await RestaurantService.getOne({
				name: data_body.name,
			});
			if (checkName) {
				throw new BadRequestError('name_exist');
			}
		}
		restaurant.set(data_body);

		if (data_body.password) {
			restaurant.set({
				password: await EncUtil.createHash(data_body.password),
			});
		}
		await restaurant.save();
		return restaurant;
	}

	async destroy(id: string) {
		const restaurant = await RestaurantService.deleteById(id);
		if (!restaurant) {
			throw new NotFoundError('restaurant_not_found');
		}
		return restaurant;
	}
}
