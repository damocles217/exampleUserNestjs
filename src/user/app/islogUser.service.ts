import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';

export async function isLog(
	code_auth: string,
	token: string,
	jwtService: JwtService,
	userModel: Model<UserDocument>,
	redisClient: any,
): Promise<boolean> {
	const decode = jwtService.decode(token, { json: true });

	if (code_auth == null || token == null) return false;

	if (code_auth == decode['code_auth']) {
		const userCacheLog = await redisClient.get(`user-log-${code_auth}`);
		const boolValue = JSON.parse(userCacheLog);

		if (boolValue) return boolValue;

		const user = await userModel.findOne({
			code_auth: code_auth,
			_id: decode['_id'],
		});

		if (user._id != null) {
			await redisClient.set(`user-log-${code_auth}`, String(true), {
				EX: 100 * 60,
			});
			return true;
		}
		return false;
	}
	return false;
}
