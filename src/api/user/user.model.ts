import mongoose from 'mongoose';
import { AddressAttrs } from '../address/address.model';

export interface UserAttrs {
	phone: string;
	password: string;
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	avatar_string?: string;
	citizen_id?: string;
	status?: number;
	type?: number;
	address_default?: mongoose.Types.ObjectId;
}

interface UserDoc extends mongoose.Document {
	id: mongoose.Types.ObjectId;
	phone: string;
	password: string;
	score: number; // float
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	avatar_string?: string;
	citizen_id?: string;
	status?: number;
	type?: number;
	address_default?: mongoose.Types.ObjectId;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		score: {
			type: Number,
			required: true,
			default: 70,
		},
		email: {
			type: String,
			required: false,
		},
		user_name: {
			type: String,
			required: true,
		},
		first_name: {
			type: String,
			required: false,
		},
		last_name: {
			type: String,
			required: false,
		},
		avatar_string: {
			type: String,
			required: false,
		},
		citizen_id: {
			type: String,
			required: false,
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		},
		type: {
			type: Number,
			required: true,
			default: 0,
		},

		address_default: {
			type: mongoose.Types.ObjectId,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		collection: 'users',
	},
);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

export { User };
