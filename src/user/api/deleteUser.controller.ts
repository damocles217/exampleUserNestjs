import { FastifyReply, FastifyRequest } from 'fastify';
import { UserDeleteArgs } from '../core/dto/user-create.dto';
import { UserService } from '../app/user.service';
import { CookieSerializeOptions } from 'fastify-cookie';

export const deleteUser = async (
	req: FastifyRequest,
	res: FastifyReply,
	body: UserDeleteArgs,
	userService: UserService,
) => {
	const cookieOptions: CookieSerializeOptions = {
		httpOnly: false,
		sameSite: true,
		path: '/',
	};

	const code_auth: string = req.cookies['c_user'];
	const token: string = req.cookies['t_user'];

	const deletedUser = await userService.deleteUser(code_auth, token, body);

	if (deletedUser == true) {
		res.clearCookie('t_user', cookieOptions);
		res.clearCookie('c_user', cookieOptions);
		return true;
	}

	return false;
};
