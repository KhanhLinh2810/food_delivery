import { UserDoc } from '../../user/user.model';

export class UserDTO {
	id: string;
	phone: string;
	score: number;
	email?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	avatar_string?: string;
	citizen_id?: string;
	status?: number;
	type?: number;
	address_default?: string;

	constructor(user: UserDoc) {
		this.id = user.id.toString();
		this.phone = user.phone;
		this.score = user.score;
		this.email = user.email;
		this.user_name = user.user_name;
		this.first_name = user.first_name;
		this.last_name = user.last_name;
		this.avatar_string = user.avatar_string;
		this.citizen_id = user.citizen_id;
		this.status = user.status;
		this.type = user.type;
		this.address_default = user.address_default
			? user.address_default.toString()
			: undefined;
	}
}
