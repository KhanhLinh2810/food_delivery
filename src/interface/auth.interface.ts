import { UserDoc } from '../api/user/user.model';

export interface ILoginInterface {
	phone: string;
	password: string;
}

export interface IToken {
	access_token: string;
	refresh_token: string;
}

export interface ITokenPayload {
	id: string;
	iat?: string;
	exp?: string;
}

declare global {
	namespace Express {
		interface Request {
			user: UserDoc;
		}
	}
}

export interface IGenToken {
	access_token_expired_in: string;
	access_token_secret: string;
	refresh_token_expired_in: string;
	refresh_token_secret: string;
}
