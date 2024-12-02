import * as userService from './user.service';
import { UserAttrs, UserDoc } from '../user.model';
import { UserDTO } from '../../dto/user/user.respone';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { EncUtil } from '../../../utilities/encryption.util';
import { NotFoundError } from '../../../common/errors/not-found-error';
import { IUserFilter } from '../../../interface/user.interface';
import { IPagination } from '../../../interface/pagination.interface';

export class UserController {
	async create(data_body: UserAttrs): Promise<UserDTO> {
		const checkPhone = await userService.getOne({ phone: data_body.phone });
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}

		data_body.password = await EncUtil.createHash(data_body.password);
		const user = await userService.create(data_body);
		return new UserDTO(user);
	}

	async getOne(id: number): Promise<UserDTO> {
		const user = await userService.getOne({ id: id });
		if (!user) {
			throw new NotFoundError('user_not_found');
		}
		return new UserDTO(user);
	}

	async getMany(
		filter: IUserFilter,
		paging: IPagination,
	): Promise<{ count: number; rows: UserDoc[] }> {
		const query = userService.buildQuery(filter);
		return await userService.getMany(query, paging);
	}

	async update(id: number, data_body: UserAttrs): Promise<UserDTO> {
		const user = await userService.getOne({ id: id });
		if (!user) {
			throw new NotFoundError('user_not_found');
		}

		if (user.phone !== data_body.phone) {
			const checkPhone = await userService.getOne({
				phone: data_body.phone,
			});
			if (checkPhone) {
				throw new BadRequestError('phone_exist');
			}
		}
		data_body.password = await EncUtil.createHash(data_body.password);
		await user.save();
		return new UserDTO(user);
	}

	async destroy(id: number) {
		const user = await userService.deleteById(id);
		if (!user) {
			throw new NotFoundError('user_not_found');
		}
		return user;
	}
}
