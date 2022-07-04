import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../core/schema/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {
	UserArgs,
	UserDeleteArgs,
	UserLog,
	UserUpdate,
} from '../core/dto/user-create.dto';
import { ResponseUser } from 'src/types/user';
import { deleteUser } from './deleteUser.service';
import { updateUser } from './updateUser.service';
import { isLog as isLoging } from './islogUser.service';
import { loginUser } from './loginUser.service';
import { createUser } from './createUser.service';
import { getMyUser } from './getMyUser.service';
// todo make cache settings
import redisClient from '../api/cache/redis';
import { logOutUser } from './logoutUser.service';

@Injectable()
export class UserService {
	client = redisClient;
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private jwtService: JwtService,
	) {}

	deleteUser = async (
		code_auth: string,
		token: string,
		body: UserDeleteArgs,
	): Promise<boolean> =>
		await deleteUser(code_auth, token, body, this.jwtService, this.userModel);

	updateUser = async (
		code_auth: string,
		token: string,
		body: UserUpdate,
	): Promise<ResponseUser> =>
		await updateUser(code_auth, token, body, this.jwtService, this.userModel);

	isLog = async (code_auth: string, token: string): Promise<boolean> =>
		await isLoging(
			code_auth,
			token,
			this.jwtService,
			this.userModel,
			this.client,
		);

	loginUser = async (input: UserLog): Promise<ResponseUser> =>
		await loginUser(input, this.userModel);

	logoutUser = async (code_auth): Promise<void> =>
		await logOutUser(this.client, code_auth);

	createUser = async (input: UserArgs): Promise<ResponseUser> =>
		await createUser(input, this.userModel);

	getMyUser = async (code_auth: string, token: string): Promise<ResponseUser> =>
		getMyUser(code_auth, token, this.jwtService, this.userModel, this.client);
}
