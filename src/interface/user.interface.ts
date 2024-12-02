import { ObjectId } from 'mongoose';

export interface IUserFilter {
	keyword?: string;

	phone?: string;
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	citizen_id?: string;
	status?: number;
	type?: number;
	// addressDefault?: ObjectId;

	name?: string;
	lower_score?: number;
	higher_score?: number;
	// address?: string;
}
