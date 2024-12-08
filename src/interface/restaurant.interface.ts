export interface IRestaurantFilter {
	code?: string;
	name?: string;
	city?: string;
	district?: string;
	phone?: string;

	keyword?: string;
	address?: string;
	lower_score?: string;
	higher_score?: string;
}
