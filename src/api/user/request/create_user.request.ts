import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsEmail,
	IsNumber,
	IsEnum,
	IsNumberString,
} from 'class-validator';
import mongoose from 'mongoose';
import { UserStatus, UserType } from '../../constances/user.constances';

export class CreateUserRequest {
	//? check regex
	@IsNotEmpty()
	@IsNumberString()
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
	@IsEnum(UserStatus)
	status?: number;

	@IsOptional()
	@IsEnum(UserType)
	type?: number;

	@IsOptional()
	address_default?: mongoose.Schema.Types.ObjectId;

	constructor(req: CreateUserRequest) {
		Object.assign(this, req);
	}
}
