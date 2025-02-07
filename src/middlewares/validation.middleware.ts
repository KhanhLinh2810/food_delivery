import { ValidationOptions, Validator } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { RequestValidationError } from '../common/errors/request-validation-error';
import { BadRequestError } from '../common/errors/bad-request-error';

export function validateBodyRed<T>(type: T, options?: ValidationOptions) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			validate(type, req.body, options);
			next();
		} catch (error: any) {
			if (error instanceof RequestValidationError) {
				next(error);
			} else {
				const message = (error as Error).message;
				next(new BadRequestError(message));
			}
		}
	};
}
export function validateParamsRed<T>(type: T, options?: ValidationOptions) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			validate(type, req.params, options);
			next();
		} catch (error: any) {
			if (error instanceof RequestValidationError) {
				next(error);
			} else {
				const message = (error as Error).message;
				next(new BadRequestError(message));
			}
		}
	};
}
export function validateQueryRed<T>(type: T, options?: ValidationOptions) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			validate(type, req.query, options);
			next();
		} catch (error: any) {
			if (error instanceof RequestValidationError) {
				next(error);
			} else {
				const message = (error as Error).message;
				next(new BadRequestError(message));
			}
		}
	};
}

function validate(type: any, data: any, options?: ValidationOptions) {
	const validator = new Validator();
	const input = plainToInstance(type, data);
	const errorsMsg = validator.validateSync(input, options || {});
	if (errorsMsg.length > 0) {
		throw new RequestValidationError(errorsMsg);
	}
	return input;
}
