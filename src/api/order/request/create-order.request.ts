import {
	IsArray,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import mongoose from 'mongoose';
import { OrderPayment } from '../../constances/order.constances';

export class CreateOrderRequest {
	@IsString()
	@IsNotEmpty()
	address!: string;

	@IsMongoId()
	@IsNotEmpty()
	user_id!: mongoose.Schema.Types.ObjectId;

	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	ship_cost!: number;

	@IsArray()
	order_items!: OrderItemRequest[];

	@IsEnum(OrderPayment)
	@IsNotEmpty()
	payment!: number;

	constructor(req: CreateOrderRequest) {
		Object.assign(this, req);
	}
}

export class OrderItemRequest {
	@IsMongoId()
	@IsNotEmpty()
	item_id!: mongoose.Schema.Types.ObjectId;

	@IsMongoId()
	@IsOptional()
	item_option_id?: mongoose.Schema.Types.ObjectId;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	quanlity!: number;

	constructor(req: OrderItemRequest) {
		Object.assign(this, req);
	}
}
