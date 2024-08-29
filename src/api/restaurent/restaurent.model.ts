import mongoose from 'mongoose';

export interface OwnerRestaurant {
	name: string; // tên chủ hoặc tên công ty
	phone: string; // số điện thoại chủ hoặc công ty
	address: string; // địa chỉ chủ hoặc công ty
	fax: string; // mã số thuế chủ hoặc công ty
	email: string; // email chủ hoặc công ty
	type: number; // 0 = cửa hàng cá nhân, 1 = cửa hàng công ty, 2 = cửa hàng nhượng quyền
	person_in_change?: string; // type = 0 -> null; 1 -> trưởng chi nhánh; 2 -> chủ nhượng quyền
}

export interface RestaurantAttrs {
	code: string; // mã shop
	name: string;
	house_number: string;
	city: string;
	district: string;
	street: string;
	owner: OwnerRestaurant;
	description?: string;
	status?: number;
}

export interface RestaurantDoc extends mongoose.Document {
	code: string; // mã shop
	name: string;
	house_number: string;
	city: string;
	district: string;
	street: string;
	owner: OwnerRestaurant;
	description?: string; // gioi thieu cua hang
	status: number; // mo cua hay dong cua
	score: number; // float, 0-100
	created_at: Date;
	updated_at: Date;
}

const OwnerRestaurantSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	fax: { type: String, required: true },
	email: { type: String, required: true },
	type: { type: Number, required: true, default: 0 },
	person_in_change: { type: String, required: false },
});

export const restaurantSchema = new mongoose.Schema<RestaurantDoc>(
	{
		code: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		house_number: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		street: {
			type: String,
			required: true,
		},
		owner: {
			type: OwnerRestaurantSchema,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		},
		score: {
			type: Number,
			required: true,
			default: 70,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		collection: 'restaurants',
	},
);

interface RestaurantModel extends mongoose.Model<RestaurantDoc> {
	build(attrs: RestaurantAttrs): RestaurantDoc;
}

const Restaurant = mongoose.model<RestaurantDoc, RestaurantModel>(
	'Restaurant',
	restaurantSchema,
);

restaurantSchema.statics.build = function (attrs: RestaurantAttrs) {
	return new Restaurant(attrs);
};

export { Restaurant };
