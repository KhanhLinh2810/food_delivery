import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class CreateRestaurantRequest {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	@IsNotEmpty()
	@IsString()
	house_number!: string;

	@IsNotEmpty()
	@IsString()
	city!: string;

	@IsNotEmpty()
	@IsString()
	district!: string;

	@IsNotEmpty()
	@IsString()
	street!: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@Type(() => OwnerRestaurantRequest)
	@ValidateNested({ each: true })
	representative?: OwnerRestaurantRequest;

	constructor(req: CreateRestaurantRequest) {
		Object.assign(this, req);
	}
}

export class OwnerRestaurantRequest {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsString()
	address!: string;

	@IsNotEmpty()
	@IsString()
	fax!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	person_in_change!: string;
}
