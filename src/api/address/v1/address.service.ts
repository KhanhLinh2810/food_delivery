import { Condition, ObjectId } from 'mongoose';
import { Address, AddressAttrs, AddressDoc } from '../address.model';

const create = async (data_body: AddressAttrs): Promise<AddressDoc> => {
	const address = Address.build(data_body);
	await address.save();
	return address;
};

const getOne = async (condition: any): Promise<AddressDoc | null> => {
	return await Address.findOne(condition);
};

const getMany = async (user_id: ObjectId): Promise<AddressDoc[]> => {
	return await Address.find({ user_id });
};

export async function deleteById(id: string): Promise<AddressDoc | null> {
	return await Address.findByIdAndDelete(id);
}

export const AddressService = {
	create,
	getOne,
	getMany,
	deleteById,
};
