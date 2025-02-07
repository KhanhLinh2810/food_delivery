import mongoose, { Schema } from 'mongoose';

export interface ItemOptionAttrs {
	name: string;
	price: number;
	status: number;
}

export interface ItemOptionDoc {
	id: mongoose.Schema.Types.ObjectId;
	name: string;
	price: number;
	status: number;
}

export const itemOptionSchema = new mongoose.Schema<ItemOptionDoc>({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		default: 0,
	},
	status: {
		type: Number,
		required: true,
		default: 0,
	},
});
