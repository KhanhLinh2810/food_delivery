import mongoose, { Schema } from 'mongoose';
import {
	ItemOptionAttrs,
	ItemOptionDoc,
	itemOptionSchema,
} from './item_option.model';

export interface ItemAttrs {
	// restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	description?: string;
	status: number;
	option_groups: {
		name: string;
		options: ItemOptionAttrs[];
	}[];
}

export interface ItemDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	description?: string;
	status: number;
	score: number;
	number_of_reviews: number;
	number_of_sales: number;
	option_groups: {
		name: string;
		options: ItemOptionDoc[];
	}[];
	created_at: Date;
	updated_at: Date;
}

interface ItemModel extends mongoose.Model<ItemDoc> {
	build(attrs: ItemAttrs): ItemDoc;
}

export const itemSchema = new mongoose.Schema<ItemDoc>(
	{
		restaurant_id: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
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
			default: 0,
		},
		number_of_reviews: {
			type: Number,
			required: true,
			default: 0,
		},
		number_of_sales: {
			type: Number,
			required: true,
			default: 0,
		},
		option_groups: [
			{
				name: {
					type: String,
					required: true,
				},
				options: {
					type: [itemOptionSchema],
					required: false,
				},
			},
		],
	},
	{
		timestamps: {
			createdAt: 'created_at', // Use `created_at` to store the created date
			updatedAt: 'updated_at', // and `updated_at` to store the last updated date
		},
	},
);

itemSchema.statics.build = (attrs: ItemAttrs) => {
	return new Item(attrs);
};

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export { Item };
