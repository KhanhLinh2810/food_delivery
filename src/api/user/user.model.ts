import mongoose from 'mongoose';
import { UserStatus, UserType } from '../../common/constances/user.constances';

export interface UserAttrs {
	phone: string;
	password: string;
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
	citizen_id?: string;
	status?: number;
	type?: number;
	address_default?: mongoose.Schema.Types.ObjectId;
}

export interface UserDoc extends mongoose.Document {
	id: mongoose.Schema.Types.ObjectId;
	phone: string;
	password: string;
	score: number;
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
	citizen_id?: string;
	status: number;
	type: number;
	address_default?: mongoose.Schema.Types.ObjectId;
	created_at: Date;
	updated_at: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		phone: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		score: { type: Number, required: true, default: 60 },
		email: { type: String },
		user_name: { type: String, required: false },
		first_name: { type: String },
		last_name: { type: String },
		avatar_url: { type: String },
		citizen_id: { type: String },
		status: { type: Number, required: true, default: UserStatus.ACTIVE },
		type: { type: Number, required: true, default: UserType.MEMBER },
		address_default: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
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

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.password;
		delete ret.__v;
		delete ret.citizen_id;
		return ret;
	},
});

userSchema.statics.build = function (attrs: UserAttrs): UserDoc {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
