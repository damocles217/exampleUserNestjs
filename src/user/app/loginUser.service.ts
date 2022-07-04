import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Error } from 'src/types/error';
import { UserLog } from '../core/dto/user-create.dto';
import { ResponseUser } from 'src/types/user';
import { mergeErrors } from '../utils/user.validate';

export async function loginUser(
	input: UserLog,
	userModel: Model<UserDocument>,
): Promise<ResponseUser> {
	const otherErrors: Error[] = [];
	try {
		const userFind = await userModel.findOne({ email: input.email });

		if (userFind == null)
			otherErrors.push({
				message: 'Usuario no reconocido',
				path: 'Email',
			});

		if (otherErrors.length > 0) throw otherErrors;

		if (await bcrypt.compare(input.password, userFind.password))
			return {
				errors: [],
				success: true,
				user: userFind,
			};

		otherErrors.push({
			message: 'Contraseña incorrecta',
			path: 'Contraseña',
		});

		if (otherErrors.length > 0) throw otherErrors;
	} catch (e) {
		return {
			errors: mergeErrors(e, otherErrors),
			user: null,
			success: false,
		};
	}
}
