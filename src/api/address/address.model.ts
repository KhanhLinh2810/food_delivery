import mongoose, { Schema } from 'mongoose';
import { AddressType } from '../../common/constances/address.constances';

export interface AddressAttrs {
	user_id?: mongoose.Schema.Types.ObjectId;
	name: string;
	phone: string;
	house_number?: string;
	city: string;
	district: string;
	street: string;
	type: number;
}

export interface AddressDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	name: string;
	phone: string;
	house_number?: string;
	city: string;
	district: string;
	street: string;
	type: number;
	created_at: Date;
	updated_at: Date;
}

export const addressSchema = new mongoose.Schema<AddressDoc>(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		house_number: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		street: {
			type: String,
			required: true,
		},
		type: {
			type: Number,
			required: true,
			default: AddressType.HOME,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at', // Use `created_at` to store the created date
			updatedAt: 'updated_at', // and `updated_at` to store the last updated date
		},
	},
);

addressSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});

interface AddressModel extends mongoose.Model<AddressDoc> {
	build(attrs: AddressAttrs): AddressDoc;
}

addressSchema.statics.build = (attrs: AddressAttrs) => {
	return new Address(attrs);
};

const Address = mongoose.model<AddressDoc, AddressModel>(
	'Address',
	addressSchema,
);

export { Address };
