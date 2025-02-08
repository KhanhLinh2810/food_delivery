import { Type } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import 'reflect-metadata';
import { OptionGroupRequest } from './option_group.request';

export class CreateItemRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsNumberString()
	@IsNotEmpty()
	price!: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsOptional()
	@Type(() => OptionGroupRequest)
	@ValidateNested({ each: true })
	option_groups?: OptionGroupRequest;
}
