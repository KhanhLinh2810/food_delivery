import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserStatus } from '../common/constances/user.constances';
import { NotAuthorizedError } from '../common/errors/not-authorized.error';
import { env } from '../env';
import { User } from '../api/user/user.model';
import { TokenInvalidError } from '../common/errors/token-invalid-error';
import { TokenExpiredError } from '../common/errors/token-expired-error';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			throw new NotAuthorizedError('unauthorized');
		}
		let data = null;
		const tokenWithoutBearer = authorization.replace('Bearer ', '');
		data = jwt.verify(tokenWithoutBearer, env.app.jwtSecret);
		const payload = data as JwtPayload;
		const user = await User.findById(payload.id);
		if (!user || user.status === UserStatus.BLOCK) {
			throw new NotAuthorizedError('unauthorized');
		}
		req.user = user;
		return next();
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError) {
			next(new TokenExpiredError('token_expired'));
		} else if (e instanceof jwt.JsonWebTokenError) {
			next(new TokenInvalidError('token_invalid'));
		} else {
			next(e);
		}
	}
};

// export const verifyAdminToken = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	try {
// 		const { authorization } = req.headers;
// 		if (authorization) {
// 			let data = null;
// 			const tokenWithoutBearer = authorization.replace('Bearer ', '');
// 			data = jwt.verify(tokenWithoutBearer, env.app.jwtSecret);
// 			const payload = data as JwtPayload;
// 			const admin = await Admin.findById(payload.id);
// 			if (!admin) {
// 				throw new NotAuthorizedError('unauthorized');
// 			}
// 			req.user = admin as any;
// 			return next();
// 		}
// 		next(new NotAuthorizedError('unauthorized'));
// 	} catch (e) {
// 		console.log(e);
// 		if (e instanceof jwt.TokenExpiredError) {
// 			next(new TokenExpiredError('token_expired'));
// 		} else if (e instanceof jwt.JsonWebTokenError) {
// 			next(new TokenInvalidError('token_invalid'));
// 		} else {
// 			next(e);
// 		}
// 	}
// };
