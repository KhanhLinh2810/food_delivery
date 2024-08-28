import { CustomError } from './custom-error';

export class TokenInvalidError extends CustomError {
	code: string;
	statusCode = 401;

	constructor(
		public message = 'Token invalid',
		code: string = 'token_invalid',
	) {
		super(message);
		this.code = code;
		Object.setPrototypeOf(this, TokenInvalidError.prototype);
	}

	serializeErrors(): { message: string | string[]; field?: string }[] {
		return [{ message: this.message }];
	}
}
