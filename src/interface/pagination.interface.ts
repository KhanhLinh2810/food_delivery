export interface IPagination {
	limit: number;
	offset: number;
	sort_by: string;
	sort_order: 'asc' | 'desc';
}
