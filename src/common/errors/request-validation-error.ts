import { CustomError } from './custom-error';
import { ValidationError } from 'class-validator';

export class RequestValidationError extends CustomError {
	code: string;
	statusCode = 400;

	constructor(
		private errors: ValidationError[],
		code: string = 'invalid_request_parameters',
	) {
		super('Invalid request parameters');
		this.code = code;
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors(): { message: string | string[]; field?: string }[] {
		return this.errors.map((err: ValidationError) => {
			const errorMessage = err.constraints
				? Object.values(err.constraints)[0]
				: 'some_thing_wrong';
			return { message: errorMessage, field: err.property };
		});
	}
}
