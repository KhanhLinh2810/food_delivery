import mongoose from 'mongoose';

export interface OrderItemAttrs {
	item_id: mongoose.Schema.Types.ObjectId;
	option_group: {
		id: mongoose.Schema.Types.ObjectId;
		item_option_ids: mongoose.Schema.Types.ObjectId[];
	};
	quanlity: number;
}

export interface OrderItemDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	item_id: mongoose.Schema.Types.ObjectId;
	option_group: {
		id: mongoose.Schema.Types.ObjectId;
		item_option_ids: mongoose.Schema.Types.ObjectId[];
	};
	quanlity: number;
}

export const orderItemSchema = new mongoose.Schema({
	item_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	option_group: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		item_option_ids: {
			type: [mongoose.Schema.Types.ObjectId],
			required: false,
		},
	},
	quanlity: {
		type: Number,
		required: true,
		default: 0,
	},
});
