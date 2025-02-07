import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	phone!: string;

	@IsString()
	@IsOptional()
	house_number?: string;

	@IsString()
	@IsNotEmpty()
	city!: string;

	@IsString()
	@IsNotEmpty()
	district!: string;

	@IsString()
	@IsNotEmpty()
	street!: string;

	@IsNumber()
	@IsNotEmpty()
	type!: number;

	constructor(req: CreateAddressRequest) {
		Object.assign(this, req);
	}
}
