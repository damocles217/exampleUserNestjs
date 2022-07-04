import { Controller, Body, Post, Res } from '@nestjs/common';
import { UserService } from '../app/user.service';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';
import { ResponseUser } from 'src/types/user';
import { UserArgs } from '../core/dto/user-create.dto';

export const createUser = async (
	body: UserArgs,
	res: FastifyReply,
	userService: UserService,
	jwtService: JwtService,
): Promise<ResponseUser> => {
	const cookieOptions: CookieSerializeOptions = {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
	};

	const response: ResponseUser = await userService.createUser(body);

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
