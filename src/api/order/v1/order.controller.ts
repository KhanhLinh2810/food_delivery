import { OrderPayment } from '../../constances/order.constances';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { ItemDoc } from '../../item/item.model';
import { ItemOptionDoc } from '../../item-option/item-option.model';
import { ItemService } from '../../item/v1/item.service';
import { PaymentService } from '../../payment/v1/payment.service';
import { UserService } from '../../user/v1/user.service';
import { OrderAttrs } from '../order.model';
import { OrderItemAttrs, OrderItemDoc } from '../order-item.model';
import { OrderService } from './order.service';
import { ObjectId } from 'mongoose';
import { ItemOptionService } from '../../item-option/v1/item-option.service';

export class OrderController {
	async create(data_body: OrderAttrs) {
		await UserService.findOrFaild(data_body.user_id.toString());

		// get id of item and item-option
		const set_list_item_id = new Set<ObjectId>();
		const set_list_item_option_id = new Set<ObjectId>();
		data_body.order_items.forEach((order_item: OrderItemAttrs) => {
			set_list_item_id.add(order_item.item_id);
			order_item.option_group.item_option_ids.forEach((option_id) =>
				set_list_item_option_id.add(option_id),
			);
		});
		const list_item_id = Array.from(set_list_item_id);
		const list_item_option_id = Array.from(set_list_item_option_id);

		// get item, item-option from db
		const [list_item, list_item_option] = await Promise.all([
			this.getAndCheckIds(
				ItemService,
				list_item_id,
				'order_item_invalid',
			),
			this.getAndCheckIds(
				ItemOptionService,
				list_item_option_id,
				'order_item_invalid',
			),
		]);

		// cal total_amount
		let total_amount = data_body.ship_cost;
		data_body.order_items.forEach((order_item: OrderItemAttrs) => {
			total_amount += this.calItemAmount(
				order_item,
				list_item,
				list_item_option,
			);
		});
		data_body.total_amount = total_amount;

		let payment;
		if (data_body.payment === OrderPayment.CASH) {
			payment = await PaymentService.create(total_amount);
		}

		const order = await OrderService.create(data_body);
		return { order, payment: payment?.client_secret };
	}

	// other function
	async getAndCheckIds(
		service: { buildQuery: Function; getMany: Function },
		ids: ObjectId[],
		error_mess: string,
	) {
		const query = service.buildQuery({
			ids: ids,
		});
		const list = await service.getMany(query);
		if (list.length !== ids.length) {
			throw new BadRequestError(error_mess);
		}
		return list;
	}

	calItemAmount(
		order_item: OrderItemAttrs,
		list_item: ItemDoc[],
		list_item_option: ItemOptionDoc[],
	): number {
		let item_amount = 0;
		// check item
		const item = list_item.find(
			(i: ItemDoc) => i.id === order_item.item_id,
		);
		if (!item) throw new BadRequestError('order_item_invalid');
		item_amount += item.price;

		// check option_group
		const order_option_group = order_item.option_group;
		const option_group = item.option_groups.find(
			(og) => og.id === order_option_group.id,
		);
		if (!option_group) {
			throw new BadRequestError('order_item_invalid');
		}

		// check item_option
		order_option_group.item_option_ids.forEach(
			// ioi - item option id
			(ioi: ObjectId) => {
				if (!option_group.item_option_ids.some((id) => id === ioi)) {
					throw new BadRequestError('order_item_invalid');
				}
				const item_option = list_item_option.find(
					(item_option: ItemOptionDoc) => item_option.id === ioi,
				);
				if (!item_option)
					throw new BadRequestError('order_item_invalid');
				item_amount += item_option.price;
			},
		);
		return item_amount * order_item.quanlity;
	}
}
