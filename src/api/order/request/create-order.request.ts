import {
	IsArray,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderRequest {
	@IsString()
	@IsNotEmpty()
	address!: string;

	@IsMongoId()
	@IsNotEmpty()
	user_id!: mongoose.Schema.Types.ObjectId;

	@IsNumber()
	@IsNotEmpty()
	ship_cost!: number;

	@IsArray()
	order_items!: OrderItemRequest[];

	@IsNumber()
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
	item_option_id!: mongoose.Schema.Types.ObjectId;

	@IsNumber()
	@IsNotEmpty()
	quanlity!: number;

	constructor(req: OrderItemRequest) {
		Object.assign(this, req);
	}
}
