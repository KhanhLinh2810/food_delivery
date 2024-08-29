import { User, UserAttrs, UserDoc } from '../user.model';

export async function create(dataBody: UserAttrs): Promise<UserDoc> {
	const user = User.build(dataBody);
	await user.save();
	return user;
}

export async function getOne(condition: any): Promise<UserDoc | null> {
	return await User.findOne({
		where: condition,
	});
}

export async function update(
	condition: any,
	dataBody: UserAttrs,
): Promise<void> {
	await User.updateOne(
		{
			$where: condition,
		},
		dataBody,
	);
}
