import mongoose from 'mongoose';
import { OwnerAttrs, OwnerDoc, OwnerSchema } from './owner.model';
import { RestaurantStatus } from '../constances/restaurant.constances';

export interface RestaurantAttrs {
	code: string;
	name: string;
	house_number: string;
	city: string;
	district: string;
	street: string;
	owner: OwnerAttrs;
	description?: string;
	phone: string;
	password: string;
	avatar_url: string;
}

export interface RestaurantDoc extends mongoose.Document {
	code: string; // mã shop
	name: string;
	house_number: string;
	city: string;
	district: string;
	street: string;
	owner: OwnerDoc;
	description?: string; // gioi thieu cua hang
	status: number; // mo cua hay dong cua
	score: number; // float, 0-100
	phone: string;
	avatar_url: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

interface RestaurantModel extends mongoose.Model<RestaurantDoc> {
	build(attrs: RestaurantAttrs): RestaurantDoc;
}

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
			type: OwnerSchema,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: RestaurantStatus.OPEN,
		},
		score: {
			type: Number,
			required: true,
			default: 70,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		// avatar_url: {
		// 	type: String,
		// 	required: true,
		// },
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
				return ret;
			},
		},
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		collection: 'restaurants',
	},
);

restaurantSchema.statics.build = function (attrs: RestaurantAttrs) {
	return new Restaurant(attrs);
};

const Restaurant = mongoose.model<RestaurantDoc, RestaurantModel>(
	'Restaurant',
	restaurantSchema,
);

export { Restaurant };
