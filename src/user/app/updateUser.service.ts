import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserUpdate } from '../core/dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { Error } from 'src/types/error';
import { mergeErrors } from '../utils/user.validate';
import { ResponseUser } from 'src/types/user';

export async function updateUser(
	code_auth: string,
	token: string,
	body: UserUpdate,

	jwtService: JwtService,
	userModel: Model<UserDocument>,
): Promise<ResponseUser> {
	const otherErrors: Error[] = [];
	try {
		const decode = jwtService.decode(token, { json: true });

		if (code_auth == decode['code_auth']) {
			const user = await this.userModel.findOne({
				code_auth: code_auth,
				_id: decode['_id'],
			});

			// * The user changes himself
			if (user.email == body.email)
				if (bcrypt.compareSync(body.passwordChecker, user.password)) {
					const updatedUser = await userModel.findOneAndUpdate(
						{ email: user.email },
						{ ...body },
						{ new: true },
					);

					await updatedUser.save();

					return {
						user: updatedUser,
						success: true,
						errors: [],
					};
				} else {
					otherErrors.push({
						message: 'La contraseña no es valida',
						path: 'Contraseña',
					});
					throw otherErrors;
				}
			// * An admin changes the user
			else if (user.admin == 2) {
				const updatedUser = await this.userModel.findOneAndUpdate(
					{
						email: body.email,
					},
					{ ...body },
				);

				await updatedUser.save();

				return {
					user: updatedUser,
					errors: [],
					success: true,
				};
			}
		} else
			otherErrors.push({
				message: 'El usuario no es coincidente',
				path: 'cookies',
			});
		throw otherErrors;
	} catch (e) {
		return {
			errors: mergeErrors(e, otherErrors),
			success: false,
			user: null,
		};
	}
}
