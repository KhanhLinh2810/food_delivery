import { env } from '../../../env';
import { IToken, ITokenPayload } from '../../../interface/auth.interface';
import jwt from 'jsonwebtoken';

export function generateToken(payload: ITokenPayload): IToken {
	const access_token = getToken(
		{
			id: payload.id,
		},
		env.app.jwtExpiredIn,
		env.app.jwtSecret,
	);

	const newRefreshToken = getToken(
		{
			id: payload.id,
		},
		env.app.refreshTokenExpiredIn,
		env.app.refreshTokenSecret,
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
