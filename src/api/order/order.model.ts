import mongoose from 'mongoose';
import {
	AddressAttrs,
	AddressDoc,
	addressSchema,
} from '../address/address.model';
import { userInfo } from 'os';
import {
	OrderItemAttrs,
	OrderItemDoc,
	orderItemSchema,
} from './order_item.model';

export interface OrderAttrs {
	shipper_id?: mongoose.Schema.Types.ObjectId;
	status: number;
	user_info: AddressAttrs;
	order_item: OrderItemAttrs[];
	ship_cost: number;
}

export interface OrderDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	shipper_id: mongoose.Schema.Types.ObjectId;
	status: number;
	user_info: AddressDoc;
	order_item: OrderItemDoc[];
	ship_cost: number;
}

const orderSchema = new mongoose.Schema<OrderDoc>(
	{
		shipper_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		},
		user_info: {
			type: addressSchema,
			required: true,
		},
		order_item: [
			{
				type: orderItemSchema,
				required: true,
			},
		],
		ship_cost: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

interface OrderModel extends mongoose.Model<OrderDoc> {
	build(attrs: OrderAttrs): OrderDoc;
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

orderSchema.statics.build = function (attrs: OrderAttrs) {
	return new Order();
};

export { Order };
