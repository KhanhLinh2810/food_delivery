import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { ItemOptionStatus } from '../../constances/item_option.constances';

export class CreateItemOptionRequest {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@Min(0)
	@IsNumber()
	@IsNotEmpty()
	price!: number;

	@IsEnum(ItemOptionStatus)
	@IsOptional()
	status?: number;

	constructor(req: CreateItemOptionRequest) {
		Object.assign(this, req);
	}
}
