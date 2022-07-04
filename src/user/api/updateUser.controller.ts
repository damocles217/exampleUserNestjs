import { UserService } from '../app/user.service';
import { ResponseUser } from 'src/types/user';
import { UserUpdate } from '../core/dto/user-create.dto';
import { FastifyRequest } from 'fastify';

export const updateUser = (
	body: UserUpdate,
	req: FastifyRequest,
	userService: UserService,
): Promise<ResponseUser> => {
	const code_auth: string = req.cookies['c_user'];
	const token: string = req.cookies['t_user'];

	return userService.updateUser(code_auth, token, body);
};
