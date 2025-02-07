import { UserAttrs, UserDoc } from '../user.model';
import { UserDTO } from '../../dto/user/user.respone';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { EncUtil } from '../../../utilities/encryption.util';
import { NotFoundError } from '../../../common/errors/not-found-error';
import { IUserFilter } from '../../../interface/user.interface';
import { IPagination } from '../../../interface/pagination.interface';
import { UserService } from './user.service';

export class UserController {
	async create(data_body: UserAttrs): Promise<UserDTO> {
		const checkPhone = await UserService.getOne({ phone: data_body.phone });
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}

		data_body.password = await EncUtil.createHash(data_body.password);
		const user = await UserService.create(data_body);
		return new UserDTO(user);
	}

	async getOne(id: string): Promise<UserDTO> {
		const user = await UserService.getOne({ id: id });
		if (!user) {
			throw new NotFoundError('user_not_found');
		}
		return new UserDTO(user);
	}

	async getMany(
		filter: IUserFilter,
		paging: IPagination,
	): Promise<{ count: number; rows: UserDoc[] }> {
		const query = UserService.buildQuery(filter);
		return await UserService.getMany(query, paging);
	}

	async update(id: string, data_body: UserAttrs): Promise<UserDTO> {
		const user = await UserService.findOrFaild(id);

		if (user.phone !== data_body.phone) {
			const checkPhone = await UserService.getOne({
				phone: data_body.phone,
			});
			if (checkPhone) {
				throw new BadRequestError('phone_exist');
			}
		}
		user.set(data_body);
		if (data_body.password)
			user.set({
				password: await EncUtil.createHash(data_body.password),
			});
		await user.save();
		return new UserDTO(user);
	}

	async destroy(id: string) {
		const user = await UserService.deleteById(id);
		if (!user) {
			throw new NotFoundError('user_not_found');
		}
		return user;
	}
}
