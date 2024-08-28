import mongoose, { Schema } from 'mongoose';

export interface ItemOptionAttrs {
	name: string;
	price: number;
	status: number;
}

export interface ItemOptionDoc {
	id: mongoose.Types.ObjectId;
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
	},
	status: {
		type: Number,
		required: true,
	},
});
