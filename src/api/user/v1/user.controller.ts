import * as UserService from './user.service';
import { UserAttrs, UserDoc } from '../user.model';
import { UserDTO } from '../../dto/user/user.respone';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { EncUtil } from '../../../utilities/encryption.util';

export class UserController {
	async create(dataBody: UserAttrs): Promise<UserDTO> {
		const userDb = await UserService.getOne({ phone: dataBody.phone });
		if (userDb) {
			throw new BadRequestError('phone exist', 'phone_exist');
		}

		dataBody.password = await EncUtil.createHash(dataBody.password);
		const user = await UserService.create(dataBody);
		return new UserDTO(user);
	}
}
