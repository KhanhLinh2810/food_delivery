import { OrderPayment } from '../../../common/constances/order.constances';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { ItemDoc } from '../../item/item.model';
import { ItemOptionDoc } from '../../item/item_option.model';
import { ItemService } from '../../item/v1/item.service';
import { PaymentService } from '../../payment/v1/payment.service';
import { UserService } from '../../user/v1/user.service';
import { OrderAttrs } from '../order.model';
import { OrderItemAttrs } from '../order_item.model';
import { OrderService } from './order.service';

export class OrderController {
	async create(data_body: OrderAttrs) {
		await UserService.findOrFaild(data_body.user_id.toString());

		// check valid item, cal total_amount
		const list_item_id = data_body.order_items.map(
			(order_item: OrderItemAttrs) => order_item.item_id,
		);
		const query = await ItemService.buildQuery({ ids: list_item_id });
		const list_item = await ItemService.getMany(query);
		if (list_item.length !== list_item_id.length) {
			throw new BadRequestError('item_invalid');
		}
		let total_amount = data_body.ship_cost;
		data_body.order_items.map((order_item: OrderItemAttrs) => {
			let item_amount = 0;
			const item = list_item.find(
				(item: ItemDoc) => item.id === order_item.item_id,
			);
			if (!item) {
				throw new BadRequestError('item_invalid');
			}
			item_amount += item.price;

			item.option_groups.map((option_group) => {
				const option = option_group.options.find(
					(option: ItemOptionDoc) =>
						option.id === order_item.item_option_id,
				);
				if (!option) {
					throw new BadRequestError('item_invalid');
				}
				item_amount += option.price;
			});
			total_amount += item_amount * order_item.quanlity;
		});
		data_body.total_amount = total_amount;

		let payment;
		if (data_body.payment === OrderPayment.CASH) {
			payment = await PaymentService.create(total_amount);
		}

		const order = await OrderService.create(data_body);
		return { order, payment: payment?.client_secret };
	}
}
