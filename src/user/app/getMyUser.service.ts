import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Error } from 'src/types/error';
import { ResponseUser } from 'src/types/user';
import { mergeErrors } from '../utils/user.validate';

export async function getMyUser(
	code_auth: string,
	token: string,
	jwtService: JwtService,
	userModel: Model<UserDocument>,
	redisClient: any,
): Promise<ResponseUser> {
	const otherErrors: Error[] = [];
	try {
		const decode = jwtService.decode(token, { json: true });

		if (code_auth == decode['code_auth']) {
			const userCache = await redisClient.get(`user-${code_auth}`);

			if (userCache) {
				const userJson = JSON.parse(userCache);
				return { user: userJson, errors: [], success: true };
			}

			const user = await userModel.findOne({
				code_auth: code_auth,
				_id: decode['_id'],
			});

			await redisClient.set(`user-${code_auth}`, JSON.stringify(user), {
				EX: 10 * 60,
			});

			return { user: user, errors: [], success: true };
		}
		otherErrors.push({ message: 'Usuario no coincidente', path: 'cookies' });
		throw otherErrors;
	} catch (e) {
		console.log(e);
		return { user: null, errors: mergeErrors(e, otherErrors), success: false };
	}
}
