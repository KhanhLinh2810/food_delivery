import { Order, OrderAttrs, OrderDoc } from '../order.model';

async function create(data_body: OrderAttrs): Promise<OrderDoc> {
	console.log(data_body);
	const order = Order.build(data_body);
	await order.save();
	return order;
}

export const OrderService = {
	create,
};
