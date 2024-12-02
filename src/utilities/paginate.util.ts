import { Request } from 'express';
import { toSafeInteger } from './data.utils';

export function paginate(
	req: Request,
	sort_by = 'createdAt',
	sort_order: 'asc' | 'desc' = 'desc',
): {
	page: number;
	limit: number;
	offset: number;
	sort_by: string;
	sort_order: 'asc' | 'desc';
} {
	const page = toSafeInteger(req.query.page) || 1;
	const limit = toSafeInteger(req.query.limit) || 10;
	return {
		page,
		limit,
		offset: (page - 1) * limit,
		sort_by: (req.query.order_by as string) || sort_by,
		sort_order: req.query.sort == 'asc' ? 'asc' : sort_order,
	};
}
