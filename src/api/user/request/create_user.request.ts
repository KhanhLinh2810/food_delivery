import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsEmail,
	IsNumber,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserRequest {
	// check regex
	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	user_name?: string;

	@IsOptional()
	@IsString()
	first_name?: string;

	@IsOptional()
	@IsString()
	last_name?: string;

	@IsOptional()
	@IsString()
	avatar_url?: string;

	@IsOptional()
	@IsString()
	citizen_id?: string;

	@IsOptional()
	@IsNumber()
	status?: number;

	@IsOptional()
	@IsNumber()
	type?: number;

	@IsOptional()
	address_default?: mongoose.Schema.Types.ObjectId;

	constructor(req: CreateUserRequest) {
		Object.assign(this, req);
	}
}
