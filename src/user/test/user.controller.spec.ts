import { Test, TestingModule } from '@nestjs/testing';
import { ResponseUser } from 'src/types/user';
import { UserController } from '../api/user.controller';
import { UserService } from '../app/user.service';
import { UserLog } from '../core/dto/user-create.dto';

describe('UserController', () => {
	let controller: UserController;

	const mockUserService = {
		deleteUser: jest.fn(),
		updateUser: jest.fn(),
		isLog: jest.fn(() => true),
		loginUser: jest.fn(
			async (body: UserLog): Promise<ResponseUser> => ({
				user: {
					_id: '123',
					name: 'Juanito',
					lastname: 'Perez',
					email: body.email,
					password: body.password,
					userId: 'juanito.perez',
					code_auth: 'flckxzmlvk0e0190fda',
					admin: 0,
					url_photo: '',
					gender: '1',
				},
				success: true,
				errors: [],
			}),
		),
		createUser: jest.fn(),
		getMyUser: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		})
			.overrideProvider(UserService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(controller.isLog).toBeDefined();
		expect(controller.loginUser).toBeDefined();
	});

	it('Is loged the user', async () => {
		jest
			.spyOn(controller, 'isLog')
			.mockImplementation(
				() => Promise.resolve(Boolean) as unknown as Promise<boolean>,
			);

		// const result = await controller.isLog(req);

		// expect(result).toBeTruthy();
	});
	it('Login user test', async () => {
		// TODO Make testing for res mocked const res
		// const result = await controller.loginUser(res, {
		// 	email: '1234@gmail.com',
		// 	password: 'password123456789',
		// });
		// expect(result).toBe({
		// 	user: {
		// 		_id: '123',
		// 		name: 'Juanito',
		// 		lastname: 'Perez',
		// 		email: '1234@gmail.com',
		// 		password: 'password123456789',
		// 		userId: 'juanito.perez',
		// 		code_auth: 'flckxzmlvk0e0190fda',
		// 		admin: 0,
		// 		url_photo: '',
		// 		gender: '1',
		// 	},
		// 	success: true,
		// 	errors: [],
		// });
	});
});
