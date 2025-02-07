import { env } from '../../../env';
import {
	IGenToken,
	IToken,
	ITokenPayload,
} from '../../../interface/auth.interface';
import jwt from 'jsonwebtoken';

export function generateToken(
	payload: ITokenPayload,
	token_info: IGenToken,
): IToken {
	const access_token = getToken(
		{
			id: payload.id,
		},
		token_info.access_token_expired_in,
		token_info.access_token_secret,
	);

	const newRefreshToken = getToken(
		{
			id: payload.id,
		},
		token_info.refresh_token_expired_in,
		token_info.refresh_token_secret,
	);

	return {
		access_token,
		refresh_token: newRefreshToken,
	};
}

function getToken(
	user: ITokenPayload,
	expiresIn: string,
	secret: string,
): string {
	return jwt.sign(
		{
			id: user.id,
		},
		secret,
		{
			expiresIn,
		},
	);
}

export const AuthService = {
	generateToken,
};
