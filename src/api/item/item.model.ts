import mongoose, { Schema } from 'mongoose';
import { ItemStatus } from '../constances/item.constances';

export interface ItemAttrs {
	restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	avatar_url: string;
	description?: string;
	option_groups: {
		name: string;
		type: number;
		item_option_ids: mongoose.Schema.Types.ObjectId[];
	}[];
}

export interface ItemDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	avatar_url: string;
	description?: string;
	status: number;
	score: number;
	number_of_reviews: number;
	number_of_sales: number;
	option_groups: {
		id: mongoose.Schema.Types.ObjectId;
		name: string;
		type: number;
		item_option_ids: mongoose.Schema.Types.ObjectId[];
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
			unique: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		avatar_url: {
			type: String,
			required: true,
			default:
				'https://img5.thuthuatphanmem.vn/uploads/2021/11/09/anh-do-an-dep-hap-dan-nhat_095145059.png',
		},
		description: {
			type: String,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: ItemStatus.ON_SALE_SOON,
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
				type: {
					type: Number,
					required: true,
				},
				item_option_ids: {
					type: [mongoose.Schema.Types.ObjectId],
					required: false,
					ref: 'ItemOption',
				},
			},
		],
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.option_groups._id;
				return ret;
			},
		},
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
