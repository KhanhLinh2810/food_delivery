import mongoose from 'mongoose';
import {
	OrderItemAttrs,
	OrderItemDoc,
	orderItemSchema,
} from './order-item.model';
import { OrderPayment, OrderStatus } from '../constances/order.constances';

export interface OrderAttrs {
	user_id: mongoose.Schema.Types.ObjectId;
	shipper_id?: mongoose.Schema.Types.ObjectId;
	address: string;
	payment: number;
	order_items: OrderItemAttrs[];
	ship_cost: number;
	total_amount: number;
}

export interface OrderDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	shipper_id: mongoose.Schema.Types.ObjectId;
	status: number;
	address: string;
	payment: number;
	order_items: OrderItemDoc[];
	ship_cost: number;
	total_amount: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
	build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema<OrderDoc>(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		shipper_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: OrderStatus.NEW,
		},
		address: {
			type: String,
			required: true,
		},
		payment: {
			type: Number,
			required: true,
			default: OrderPayment.COD,
		},
		order_items: [
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
		total_amount: {
			type: Number,
			required: true,
			default: 0,
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
	},
);

orderSchema.statics.build = function (attrs: OrderAttrs) {
	return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
