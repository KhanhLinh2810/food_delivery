import mongoose, { Schema } from 'mongoose';

export interface AddressAttrs {
	user_id: mongoose.Types.ObjectId;
	name: string;
	phone: string;
	house_number?: string;
	city: string;
	district: string;
	street: string;
	type: number; // home or office
}

export interface AddressDoc {
	id: mongoose.Types.ObjectId;
	user_id: mongoose.Types.ObjectId;
	name: string;
	phone: string;
	house_number?: string;
	city: string;
	district: string;
	street: string;
	type: number;
}

interface AddressModel extends mongoose.Model<AddressDoc> {
	build(attrs: AddressAttrs): AddressDoc;
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
			default: 1,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at', // Use `created_at` to store the created date
			updatedAt: 'updated_at', // and `updated_at` to store the last updated date
		},
	},
);

const Address = mongoose.model<AddressDoc, AddressModel>(
	'Address',
	addressSchema,
);

addressSchema.statics.build = (attrs: AddressAttrs) => {
	return new Address(attrs);
};

export { Address };
