import { FastifyRequest } from 'fastify';
import { UserService } from '../app/user.service';

export const isLog = async (
	req: FastifyRequest,
	userService: UserService,
): Promise<boolean> => {
	const token: string = req.cookies['t_user'];
	const code_auth: string = req.cookies['c_user'];

	return await userService.isLog(code_auth, token);
};
