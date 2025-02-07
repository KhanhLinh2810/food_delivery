import { ObjectId } from 'mongoose';
import { AddressAttrs, AddressDoc } from '../address.model';
import { AddressService } from './address.service';
import { UserService } from '../../user/v1/user.service';
import { NotFoundError } from '../../../common/errors/not-found-error';

export class AddressController {
	async create(
		data_body: AddressAttrs,
		user_id: ObjectId,
	): Promise<AddressDoc> {
		await UserService.findOrFaild(user_id.toString());
		data_body.user_id = user_id;
		return await AddressService.create(data_body);
	}

	async getMany(user_id: ObjectId): Promise<AddressDoc[]> {
		return await AddressService.getMany(user_id);
	}

	async getOne(user_id: ObjectId, address_id: string): Promise<AddressDoc> {
		const address = await AddressService.getOne({
			user_id,
			_id: address_id,
		});
		if (!address) {
			throw new NotFoundError('address_not_found');
		}
		return address;
	}

	async update(
		data_body: AddressAttrs,
		user_id: ObjectId,
		address_id: string,
	): Promise<AddressDoc> {
		await UserService.findOrFaild(user_id.toString());
		data_body.user_id = user_id;

		const address = await this.getOne(user_id, address_id);
		address.set(data_body);
		await address.save();

		return address;
	}

	async delete(user_id: ObjectId, address_id: string): Promise<AddressDoc> {
		const address = await this.getOne(user_id, address_id);
		await address.deleteOne();

		return address;
	}
}
