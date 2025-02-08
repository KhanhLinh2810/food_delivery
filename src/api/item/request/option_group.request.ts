import {
	IsArray,
	IsMongoId,
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString,
} from 'class-validator';

export class OptionGroupRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsNumberString()
	@IsNotEmpty()
	type!: string;

	@IsOptional()
	@IsArray()
	@IsMongoId({ each: true })
	item_option_ids?: string[];

	constructor(req: OptionGroupRequest) {
		Object.assign(this, req);
	}
}
