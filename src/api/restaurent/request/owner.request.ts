import { IsNotEmpty, IsString } from 'class-validator';

export class OwnerRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	address!: string;

	@IsString()
	@IsNotEmpty()
	fax!: string;

	@IsString()
	@IsNotEmpty()
	email!: string;

	@IsString()
	@IsNotEmpty()
	type!: number | string;

	@IsString()
	@IsNotEmpty()
	person_in_change!: string;

	constructor(req: OwnerRequest) {
		Object.assign(this, req);
	}
}
