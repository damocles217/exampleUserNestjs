import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Req,
	Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseUser } from 'src/types/user';
import { UserService } from '../app/user.service';
import {
	UserLog,
	UserUpdate,
	UserArgs,
	UserDeleteArgs,
} from '../core/dto/user-create.dto';
import { createUser } from './createUser.controller';
import { deleteUser } from './deleteUser.controller';
import { getMyUser } from './getMyUser.controller';
import { isLog } from './islogUser.controller';
import { logOut } from './logoutUser.controller';
import { updateUser } from './updateUser.controller';
import { loginUser } from './userLogin.controller';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	@Get('/')
	async isLog(@Req() req: FastifyRequest): Promise<boolean> {
		return await isLog(req, this.userService);
	}

	@Get('logout')
	logOut(
		@Res({ passthrough: true }) res: FastifyReply,
		@Req() req: FastifyRequest,
	) {
		return logOut(req, res, this.userService);
	}

	@Get('find')
	async getMyUser(@Req() req: FastifyRequest): Promise<ResponseUser> {
		return getMyUser(req, this.userService);
	}

	@Post('/login')
	async loginUser(
		@Res({ passthrough: true }) res: FastifyReply,
		@Body() body: UserLog,
	): Promise<ResponseUser> {
		return await loginUser(body, res, this.jwtService, this.userService);
	}

	@Post('create')
	async createUser(
		@Body() body: UserArgs,
		@Res({ passthrough: true }) res: FastifyReply,
	): Promise<ResponseUser> {
		return await createUser(body, res, this.userService, this.jwtService);
	}

	@Put('update')
	async updateUser(
		@Body() body: UserUpdate,
		@Req() req: FastifyRequest,
	): Promise<ResponseUser> {
		return await updateUser(body, req, this.userService);
	}

	@Delete('/')
	async deleteUser(
		@Req() req: FastifyRequest,
		@Res({ passthrough: true }) res: FastifyReply,
		@Body() body: UserDeleteArgs,
	) {
		return await deleteUser(req, res, body, this.userService);
	}
}
