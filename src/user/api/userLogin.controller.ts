import { UserLog } from '../core/dto/user-create.dto';
import { CookieSerializeOptions } from 'fastify-cookie';
import { ResponseUser } from 'src/types/user';
import { FastifyReply } from 'fastify';
import { UserService } from '../app/user.service';
import { JwtService } from '@nestjs/jwt';

export const loginUser = async (
	body: UserLog,
	res: FastifyReply,
	jwtService: JwtService,
	userService: UserService,
): Promise<ResponseUser> => {
	const cookieOptions: CookieSerializeOptions = {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
	};

	const response: ResponseUser = await userService.loginUser(body);

	if (response.success) {
		const payload = {
			_id: response.user._id,
			code_auth: response.user.code_auth,
		};
		const token = jwtService.sign(payload);
		res.setCookie('c_user', response.user.code_auth, cookieOptions);
		res.setCookie('t_user', token, cookieOptions);
	}

	return response;
};
