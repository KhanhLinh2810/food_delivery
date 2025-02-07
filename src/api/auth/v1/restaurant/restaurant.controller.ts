import {
	RESTAURANT_CODE_LEN,
	RESTAURANT_CODE_PERFIX,
} from '../../../../common/constances/restaurant.constances';
import { BadRequestError } from '../../../../common/errors/bad-request-error';
import { env } from '../../../../env';
import { ILoginInterface, IToken } from '../../../../interface/auth.interface';
import { EncUtil } from '../../../../utilities/encryption.util';
import { genCode } from '../../../../utilities/string.util';
import {
	RestaurantAttrs,
	RestaurantDoc,
} from '../../../restaurent/restaurant.model';
import { RestaurantService } from '../../../restaurent/v1/restaurant.service';
import { AuthService } from '../auth.service';

//? sua lai env pass cho retaurant
export class RestaurantController {
	async register(data_body: RestaurantAttrs): Promise<RestaurantDoc> {
		const checkPhone = await RestaurantService.getOne({
			phone: data_body.phone,
		});
		if (checkPhone) {
			throw new BadRequestError('phone_exist');
		}
		if (data_body.password)
			data_body.password = await EncUtil.createHash(data_body.password);

		data_body.code = await genCode(
			RESTAURANT_CODE_PERFIX,
			RESTAURANT_CODE_LEN,
		);
		return await RestaurantService.create(data_body);
	}

	async login(data_body: ILoginInterface): Promise<IToken> {
		const restaurant = await RestaurantService.getOne({
			phone: data_body.phone,
		});
		if (!restaurant) {
			throw new BadRequestError('phone_not_register');
		}
		const isValidPassword = await EncUtil.comparePassword(
			data_body.password,
			restaurant.password,
		);
		if (!isValidPassword) {
			throw new BadRequestError('password_not_match');
		}

		const token = AuthService.generateToken(
			{
				id: restaurant.id as unknown as string,
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
