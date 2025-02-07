import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemOptionRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsNumber()
	@IsNotEmpty()
	price!: number;

	@IsNumber()
	@IsNotEmpty()
	status!: number;

	constructor(req: CreateItemOptionRequest) {
		Object.assign(this, req);
	}
}
