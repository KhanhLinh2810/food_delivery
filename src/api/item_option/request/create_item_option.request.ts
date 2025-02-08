import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemOptionRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsNumber()
	@IsNotEmpty()
	price!: number;

	@IsNumber()
	@IsOptional()
	status?: number;

	constructor(req: CreateItemOptionRequest) {
		Object.assign(this, req);
	}
}
