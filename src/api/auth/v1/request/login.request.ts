import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;

	constructor(req: LoginRequest) {
		Object.assign(this, req);
	}
}
