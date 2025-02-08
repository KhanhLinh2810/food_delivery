import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
} from 'class-validator';

export class OwnerRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsNumberString()
	@IsNotEmpty()
	phone!: string;

	@IsString()
	@IsNotEmpty()
	address!: string;

	@IsString()
	@IsNotEmpty()
	fax!: string;

	@IsEmail()
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
