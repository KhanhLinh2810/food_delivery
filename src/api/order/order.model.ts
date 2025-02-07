import mongoose from 'mongoose';
import {
	OrderItemAttrs,
	OrderItemDoc,
	orderItemSchema,
} from './order_item.model';
import {
	OrderPayment,
	OrderStatus,
} from '../../common/constances/order.constances';

export interface OrderAttrs {
	shipper_id?: mongoose.Schema.Types.ObjectId;
	address: string;
	user_id: mongoose.Schema.Types.ObjectId;
	order_items: OrderItemAttrs[];
	ship_cost: number;
	payment: number;
	total_amount?: number;
}

export interface OrderDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	shipper_id: mongoose.Schema.Types.ObjectId;
	status: number;
	address: string;
	order_items: OrderItemDoc[];
	ship_cost: number;
	total_amount: number;
	payment: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
	build(attrs: OrderAttrs): OrderDoc;
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
			default: OrderStatus.NEW,
		},
		address: {
			type: String,
			required: true,
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
		payment: {
			type: Number,
			required: true,
			default: OrderPayment.COD,
		},
	},
	{
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
