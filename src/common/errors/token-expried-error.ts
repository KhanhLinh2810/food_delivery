import { CustomError } from './custom-error';

export class TokenExpriedError extends CustomError {
	code: string;
	statusCode = 401;

	constructor(
		public message = 'Token expried',
		code: string = 'token_expried',
	) {
		super(message);
		this.code = code;
		Object.setPrototypeOf(this, TokenExpriedError.prototype);
	}

	serializeErrors(): { message: string | string[]; field?: string }[] {
		return [{ message: this.message }];
	}
}
