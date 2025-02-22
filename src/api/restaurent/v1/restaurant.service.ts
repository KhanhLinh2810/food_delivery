import {
	RESTAURANT_CODE_LEN,
	RESTAURANT_CODE_PERFIX,
} from '../../constances/restaurant.constances';
import { IPagination } from '../../../interface/pagination.interface';
import { IRestaurantFilter } from '../../../interface/restaurant.interface';
import { genCode } from '../../../utilities/string.util';
import {
	Restaurant,
	RestaurantAttrs,
	RestaurantDoc,
} from '../restaurant.model';
import { RESTAURANT_URL } from '../../../common/constances';

async function create(data_body: RestaurantAttrs): Promise<RestaurantDoc> {
	data_body.code = await genCode(RESTAURANT_CODE_PERFIX, RESTAURANT_CODE_LEN);
	const restaurant = Restaurant.build(data_body);
	await restaurant.save();
	return restaurant;
}

async function getOne(condition: any): Promise<RestaurantDoc | null> {
	return await Restaurant.findOne(condition);
}

async function getMany(
	query: object,
	paging: IPagination,
): Promise<{ count: number; rows: RestaurantDoc[] }> {
	const data = await Restaurant.aggregate([
		{ $match: query },
		{
			$addFields: {
				address: [
					{
						$concat: [
							{ $ifNull: ['house_number', ''] },
							{ $ifNull: ['street', ''] },
							{ $ifNull: ['district', ''] },
							{ $ifNull: ['$city', ''] },
						],
					},
					{
						$concat: [
							{ $ifNull: ['house_number', ''] },
							' ',
							{ $ifNull: ['street', ''] },
							' ',
							{ $ifNull: ['district', ''] },
							' ',
							{ $ifNull: ['$city', ''] },
							' ',
						],
					},
				],
			},
		},
		{
			$facet: {
				metadata: [{ $count: 'total_item' }],
				data: [
					{
						$sort: {
							[paging.sort_by]:
								paging.sort_order === 'asc' ? 1 : -1,
						},
					},
					{ $skip: paging.offset },
					{ $limit: paging.limit },
				],
			},
		},
	]).exec();

	return {
		count: data[0]?.metadata?.total_item | 0,
		rows: data[0]?.data as RestaurantDoc[] | [] as RestaurantDoc[],
	};
}

async function deleteById(id: string): Promise<RestaurantDoc | null> {
	return await Restaurant.findByIdAndDelete(id);
}

function buildQuery(filter: IRestaurantFilter) {
	const query: any = { $and: [] };
	if (filter.code) {
		query.$and.push({ code: { $regex: new RegExp(filter.code, 'i') } });
	}
	if (filter.name) {
		query.$and.push({ name: { $regex: new RegExp(filter.name, 'i') } });
	}
	if (filter.city) {
		query.$and.push({ city: { $regex: new RegExp(filter.city, 'i') } });
	}
	if (filter.district) {
		query.$and.push({
			district: { $regex: new RegExp(filter.district, 'i') },
		});
	}
	if (filter.phone) {
		query.$and.push({ phone: { $regex: new RegExp(filter.phone, 'i') } });
	}
	if (filter.keyword) {
		const keyword_regex = new RegExp(filter.keyword, 'i');
		query.$and.push({
			$or: [
				{ code: { $regex: keyword_regex } },
				{ address: { $regex: keyword_regex } },
				{ phone: { $regex: keyword_regex } },
			],
		});
	}
	if (filter.address) {
		query.$and.push({
			address: { $regex: new RegExp(filter.address, 'i') },
		});
	}
	if (filter.lower_score && filter.higher_score) {
		query.$and.push({
			score: {
				$and: [
					{ $gte: filter.lower_score },
					{ $lte: filter.higher_score },
				],
			},
		});
	} else if (filter.lower_score) {
		query.$and.push({ score: { $gte: filter.lower_score } });
	} else if (filter.higher_score) {
		query.$and.push({ score: { $lte: filter.higher_score } });
	}
	return query;
}

function IsSiteRestaurant(original_url: string): boolean {
	return RESTAURANT_URL.some((url: string) => original_url.startsWith(url));
}

export const RestaurantService = {
	create,
	getOne,
	getMany,
	deleteById,
	buildQuery,
	IsSiteRestaurant,
};
