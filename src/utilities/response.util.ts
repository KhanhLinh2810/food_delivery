export const resOk = (
	data: any,
	message?: string,
	total_item?: number,
	limit?: number,
	page?: number,
	total_pages?: number,
) => ({
	message,
	data,
	meta: {
		total_item: total_item || undefined,
		limit: limit || undefined,
		page: page || undefined,
		total_pages: total_pages || undefined,
	},
});

export const resErr = (
	message: string | string[],
	code?: string,
	errors?: any,
) => ({ message, code, errors });
