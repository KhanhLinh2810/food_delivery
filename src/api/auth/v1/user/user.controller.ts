import { BadRequestError } from '../../../../common/errors/bad-request-error';
import { env } from '../../../../env';
import { ILoginInterface, IToken } from '../../../../interface/auth.interface';
import { EncUtil } from '../../../../utilities/encryption.util';
import { UserDTO } from '../../../dto/user/user.respone';
import { User, UserAttrs } from '../../../user/user.model';
import { UserService } from '../../../user/v1/user.service';
import { AuthService } from '../auth.service';

export class UserController {
	async register(data_body: UserAttrs): Promise<UserDTO> {
		const checkPhone = await UserService.getOne({ phone: data_body.phone });
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}

		data_body.password = await EncUtil.createHash(data_body.password);
		const user = await UserService.create(data_body);
		return new UserDTO(user);
	}

	async login(data_body: ILoginInterface): Promise<IToken> {
		const user = await UserService.getOne({ phone: data_body.phone });
		if (!user) {
			throw new BadRequestError('phone_not_register');
		}
		const isValidPassword = await EncUtil.comparePassword(
			data_body.password,
			user.password,
		);
		if (!isValidPassword) {
			throw new BadRequestError('password_not_match');
		}

		const token = AuthService.generateToken(
			{
				id: user.id as unknown as string,
			},
			{
				access_token_expired_in: env.app.jwtExpiredIn,
				access_token_secret: env.app.jwtSecret,
				refresh_token_expired_in: env.app.refreshTokenExpiredIn,
				refresh_token_secret: env.app.refreshTokenSecret,
			},
		);
		return token;
	}
}
