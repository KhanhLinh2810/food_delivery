import mongoose, { Schema } from 'mongoose';
import {
	ItemOptionAttrs,
	ItemOptionDoc,
	itemOptionSchema,
} from './item_option.model';

export interface ItemAttrs {
	shop_id: mongoose.Types.ObjectId;
	name: string;
	price: number;
	description?: string;
	status: number;
	option_groups: {
		name: string;
		option: ItemOptionAttrs[];
	}[];
}

export interface ItemDoc {
	id: mongoose.Types.ObjectId;
	shop_id: mongoose.Types.ObjectId;
	name: string;
	price: number;
	description?: string;
	status: number;
	option_groups: {
		name: string;
		option: ItemOptionDoc[];
	}[];
}

interface ItemModel extends mongoose.Model<ItemDoc> {
	build(attrs: ItemAttrs): ItemDoc;
}

export const itemSchema = new mongoose.Schema<ItemDoc>(
	{
		shop_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
		option_groups: [
			{
				name: {
					type: String,
					required: true,
				},
				option: {
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

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

itemSchema.statics.build = (attrs: ItemAttrs) => {
	return new Item(attrs);
};

export { Item };
