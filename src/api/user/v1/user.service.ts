import mongoose from 'mongoose';
import { IPagination } from '../../../interface/pagination.interface';
import { IUserFilter } from '../../../interface/user.interface';
import { getKeysMatching } from '../../../utilities/string.util';
import { User, UserAttrs, UserDoc } from '../user.model';
import { BadRequestError } from '../../../common/errors/bad-request-error';

export async function create(data_body: UserAttrs): Promise<UserDoc> {
	const user = User.build(data_body);
	await user.save();
	return user;
}

export async function getOne(condition: any): Promise<UserDoc | null> {
	return await User.findOne(condition);
}

export async function getMany(
	query: object,
	paging: IPagination,
): Promise<{ count: number; rows: UserDoc[] }> {
	const data = await User.aggregate([
		{ $match: query },
		{
			$addFields: {
				name: [
					{
						$concat: [
							{ $ifNull: ['$first_name', ''] },
							{ $ifNull: ['$last_name', ''] },
						],
					},
					{
						$concat: [
							{ $ifNull: ['$first_name', ''] },
							' ',
							{ $ifNull: ['$last_name', ''] },
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
		rows: data[0]?.data as UserDoc[] | [] as UserDoc[],
	};
}

export async function update(
	condition: any,
	data_body: UserAttrs,
): Promise<UserDoc | null> {
	const user = await User.findOneAndUpdate(
		{
			$where: condition,
		},
		data_body,
	);
	return user;
}

export async function deleteById(id: string): Promise<UserDoc | null> {
	return await User.findByIdAndDelete(id);
}

// other function
export async function buildQuery(filter: IUserFilter) {
	const query: any = { $and: [] };
	if (filter.status) {
		query.$and.push({ status: filter.status });
	}
	if (filter.type) {
		query.$and.push({ type: filter.type });
	}
	if (filter.keyword) {
		const keyword_regex = new RegExp(filter.keyword, 'i');
		query.$and.push({
			$or: [
				{ phone: { $regex: keyword_regex } },
				{ email: { $regex: keyword_regex } },
				{ user_name: { $regex: keyword_regex } },
				{ first_name: { $regex: keyword_regex } },
				{ last_name: { $regex: keyword_regex } },
				{ citizen_id: { $regex: keyword_regex } },
				{ name: { $elemMatch: { $regex: keyword_regex } } },
			],
		});
		return query;
	}
	if (filter.phone) {
		query.$and.push({ phone: { $regex: new RegExp(filter.phone, 'i') } });
	}
	if (filter.email) {
		query.$and.push({ email: { $regex: new RegExp(filter.email, 'i') } });
	}
	if (filter.user_name) {
		query.$and.push({
			user_name: { $regex: new RegExp(filter.user_name, 'i') },
		});
	}
	if (filter.first_name) {
		query.$and.push({
			first_name: { $regex: new RegExp(filter.first_name, 'i') },
		});
	}
	if (filter.last_name) {
		query.$and.push({
			last_name: { $regex: new RegExp(filter.last_name, 'i') },
		});
	}
	if (filter.citizen_id) {
		query.$and.push({
			citizen_id: { $regex: new RegExp(filter.citizen_id, 'i') },
		});
	}
	if (filter.name) {
		query.$and.push({
			name: { $elemMatch: { $regex: new RegExp(filter.name, 'i') } },
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

async function findById(id: string): Promise<UserDoc> {
	const user = await User.findById(id);
	if (!user) {
		throw new BadRequestError('user_not_found');
	}
	return user;
}

export const UserService = {
	create,
	getOne,
	getMany,
	update,
	deleteById,
	buildQuery,
	findOrFaild: findById,
};
