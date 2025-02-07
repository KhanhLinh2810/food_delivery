import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../common/errors/custom-error';
import { RequestValidationError } from '../common/errors/request-validation-error';
import { resErr } from '../utilities/response.util';

export const ErrorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log(err);
	if (err instanceof CustomError) {
		if (err instanceof RequestValidationError) {
			const errors = err.serializeErrors();
			return res
				.status(err.statusCode)
				.send(resErr('error', err.code, errors));
		}

		return res
			.status(err.statusCode)
			.send(resErr(err.message, err.code, err));
	}

	res.status(500).send('some_thing_wrong');
};
