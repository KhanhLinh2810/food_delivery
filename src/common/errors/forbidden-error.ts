import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
	code: string;
	statusCode = 403;

	constructor(
		public message = 'Forbidden',
		code: string = 'forbidden',
	) {
		super(message);
		this.code = code;
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}

	serializeErrors(): { message: string | string[]; field?: string }[] {
		return [{ message: this.message }];
	}
}
