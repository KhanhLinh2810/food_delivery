import mongoose from 'mongoose';
import {
	Restaurant,
	RestaurantAttrs,
	restaurantSchema,
} from '../restaurent/restaurent.model';

export interface ComboAttrs {
	name: string;
	description?: string;
	price: number;
	combo_item: {
		item_id: mongoose.Types.ObjectId;
		item_option: mongoose.Types.ObjectId;
		quanlity: number;
	}[];
}

export interface ComboDoc {
	id: mongoose.Types.ObjectId;
	code: string;
	name: string;
	description?: string;
	price: number;
	combo_item: {
		item_id: mongoose.Types.ObjectId;
		item_option: mongoose.Types.ObjectId;
		quanlity: number;
	}[];
	created_at: Date;
	updated_at: Date;
}

const comboItemSchema = new mongoose.Schema({
	item_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	item_option: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	quanlity: {
		type: Number,
		required: true,
		default: 0,
	},
});

export const comboSchema = new mongoose.Schema<ComboDoc>(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		combo_item: [
			{
				type: comboItemSchema,
				required: false,
			},
		],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

interface ComboModel extends mongoose.Model<ComboDoc> {
	build(attrs: ComboAttrs): ComboDoc;
}

const Combo = mongoose.model<ComboDoc, ComboModel>('Combo', comboSchema);

comboSchema.statics.build = function (attrs: ComboAttrs) {
	return new Combo();
};

export { Combo };
