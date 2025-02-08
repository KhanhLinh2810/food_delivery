export enum RestaurantStatus {
	OPEN = 1,
	NOT_OPEN_YET = 2,
	TEMPORARILY_SUSPENDED = 3,
	PERMANENTLY_CLOSED = 4,
}

export enum OwnerType {
	INDIVIDUAL = 1,
	COMPANY = 2,
	FRANCHISE = 3,
}

export const RESTAURANT_CODE_PERFIX = 'RS';
export const RESTAURANT_CODE_LEN = 9;
