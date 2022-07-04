import { FastifyRequest } from 'fastify';
import { UserService } from '../app/user.service';
import { ResponseUser } from 'src/types/user';

export const getMyUser = async (
	req: FastifyRequest,
	userService: UserService,
): Promise<ResponseUser> => {
	const code_auth = req.cookies['c_user'];
	const token = req.cookies['t_user'];

	return await userService.getMyUser(code_auth, token);
};
