import mongoose from 'mongoose';
import { OwnerType } from '../../common/constances/restaurant.constances';

export interface OwnerAttrs {
	name: string; // tên chủ hoặc tên công ty
	phone: string; // số điện thoại chủ hoặc công ty
	address: string; // địa chỉ chủ hoặc công ty
	fax: string; // mã số thuế chủ hoặc công ty
	email: string; // email chủ hoặc công ty
	type: number; // 0 = cửa hàng cá nhân, 1 = cửa hàng công ty, 2 = cửa hàng nhượng quyền
	person_in_change: string; // type = 0 -> ten chu; 1 -> trưởng chi nhánh; 2 -> chủ nhượng quyền
}

export interface OwnerDoc extends mongoose.Document {
	name: string;
	phone: string;
	address: string;
	fax: string;
	email: string;
	type: number;
	person_in_change: string;
}

export const OwnerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		fax: { type: String, required: true },
		email: { type: String, required: true },
		type: { type: Number, required: true, default: OwnerType.INDIVIDUAL },
		person_in_change: { type: String, required: true },
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
		timestamps: false,
		collection: 'owners',
	},
);
