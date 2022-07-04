import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Error } from 'src/types/error';
import { UserArgs } from '../core/dto/user-create.dto';
import { ResponseUser } from 'src/types/user';
import { aleatoryCode, mergeErrors } from '../utils/user.validate';

export async function createUser(
	input: UserArgs,
	userModel: Model<UserDocument>,
): Promise<ResponseUser> {
	const otherErrors: Error[] = [];
	try {
		let code_auth = aleatoryCode();
		let counter = 0;
		let userId = `${input.name}.${input.lastname}`;

		if (input.password !== input.confirmPassword)
			otherErrors.push({
				message: 'Las contraseñas deben coincidir',
				path: 'contraseña',
			});
		if (input.password.length < 10)
			otherErrors.push({
				message: 'La contraseña debe tener 10 caracteres',
				path: 'contraseña',
			});

		if (otherErrors.length > 0) throw otherErrors;

		userId = userId.toLocaleLowerCase();
		let checkedUser = await userModel.findOne({ userId });

		while (checkedUser) {
			if (checkedUser) {
				counter++;
				if (counter < 2) userId = String.prototype.concat(userId, `${counter}`);
				else userId = userId.replace(/[0-9]+/, counter.toString());
			}
			checkedUser = await userModel.findOne({ userId });
		}

		checkedUser = await userModel.findOne({ code_auth });
		while (checkedUser) {
			if (checkedUser) code_auth = aleatoryCode();
			checkedUser = await userModel.findOne({ code_auth });
		}

		input.password = bcrypt.hashSync(input.password, 10);

		const newUser = await userModel.create({
			...input,
			code_auth: code_auth,
			userId: userId,
		});

		return {
			user: newUser,
			errors: [],
			success: true,
		};
	} catch (e) {
		return {
			user: null,
			errors: mergeErrors(e, otherErrors),
			success: false,
		};
	}
}
