import mongoose, { Schema } from 'mongoose';
import { ItemOptionStatus } from '../constances/item_option.constances';

export interface ItemOptionAttrs {
	restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	status: number;
}

export interface ItemOptionDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	restaurant_id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	status: number;
}

interface ItemOptionModel extends mongoose.Model<ItemOptionDoc> {
	build(attrs: ItemOptionAttrs): ItemOptionDoc;
}

export const itemOptionSchema = new mongoose.Schema<ItemOptionDoc>(
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
		status: {
			type: Number,
			required: true,
			default: ItemOptionStatus.AVAILABLE,
		},
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		collection: 'item_options',
	},
);

itemOptionSchema.statics.build = function (
	attrs: ItemOptionAttrs,
): ItemOptionDoc {
	return new ItemOption(attrs);
};

const ItemOption = mongoose.model<ItemOptionDoc, ItemOptionModel>(
	'ItemOption',
	itemOptionSchema,
);

export { ItemOption };
