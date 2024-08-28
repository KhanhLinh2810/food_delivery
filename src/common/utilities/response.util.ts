export declare const resOk: (
	data: any,
	message?: string,
	total_item?: number,
	limit?: number,
	page?: number,
	total_pages?: number,
) => {
	message?: string;
	data: any;
	meta: {
		total_item?: number;
		limit?: number;
		page?: number;
		total_pages?: number;
	};
};

export declare const resErr: (
	errors: any,
	message: string | string[],
	code?: string,
) => { message: string | string[]; code?: string; errors: any };
