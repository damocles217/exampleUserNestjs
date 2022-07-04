import { FastifyReply, FastifyRequest } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';
import { UserService } from '../app/user.service';

export const logOut = async (
	req: FastifyRequest,
	res: FastifyReply,
	userService: UserService,
): Promise<boolean> => {
	const cookieOptions: CookieSerializeOptions = {
		httpOnly: false,
		sameSite: true,
		path: '/',
	};

	const code_auth = req.cookies['c_user'];

	await userService.logoutUser(code_auth);
	res.clearCookie('t_user', cookieOptions);
	res.clearCookie('c_user', cookieOptions);
	return true;
};
