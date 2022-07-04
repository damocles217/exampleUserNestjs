import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDeleteArgs } from '../core/dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { Error } from 'src/types/error';

export async function deleteUser(
	code_auth: string,
	token: string,
	body: UserDeleteArgs,

	jwtService: JwtService,
	userModel: Model<UserDocument>,
): Promise<boolean> {
	const otherErrors: Error[] = [];
	try {
		const decode = jwtService.decode(token, { json: true });

		if (code_auth == decode['code_auth']) {
			const user = await userModel.findOne({
				code_auth: code_auth,
				_id: decode['_id'],
			});

			if (user.admin == 2) {
				const userNew = await userModel.findOneAndDelete(
					{
						email: body.email,
					},
					{ new: true },
				);

				if (userNew._id != null) return true;
				otherErrors.push({
					message: 'Usuario no encontrado',
					path: 'email',
				});

				throw otherErrors;
			} else if (user.email == body.email) {
				if (bcrypt.compareSync(body.password, user.password)) {
					const userNew = await userModel.findOneAndDelete(
						{
							email: body.email,
						},
						{ new: true },
					);

					if (userNew._id != null) return true;
					otherErrors.push({
						message: 'Usuario no encontrado',
						path: 'email',
					});
					throw otherErrors;
				}
			}
		}
	} catch (e) {
		return false;
	}
}
