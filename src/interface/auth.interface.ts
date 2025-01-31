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
