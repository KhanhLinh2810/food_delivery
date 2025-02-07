import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OwnerRequest } from './owner.request';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class CreateRestaurantRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	house_number!: string;

	@IsString()
	@IsNotEmpty()
	city!: string;

	@IsString()
	@IsNotEmpty()
	district!: string;

	@IsString()
	@IsNotEmpty()
	street!: string;

	@Type(() => OwnerRequest)
	@IsNotEmpty()
	owner!: OwnerRequest;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@IsNotEmpty()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;

	constructor(req: CreateRestaurantRequest) {
		Object.assign(this, req);
	}
}
