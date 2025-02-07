import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressRequest {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	phone?: string;

	@IsString()
	@IsOptional()
	house_number?: string;

	@IsString()
	@IsOptional()
	city?: string;

	@IsString()
	@IsOptional()
	district?: string;

	@IsString()
	@IsOptional()
	street?: string;

	@IsNumber()
	@IsOptional()
	type?: number;

	constructor(req: UpdateAddressRequest) {
		Object.assign(this, req);
	}
}
