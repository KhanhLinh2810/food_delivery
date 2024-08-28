import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
	code: string;
	statusCode = 404;

	constructor(
		public message = 'Not Found',
		code: string = 'not_found',
	) {
		super(message);
		this.code = code;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors(): { message: string | string[]; field?: string }[] {
		return [{ message: this.message }];
	}
}
