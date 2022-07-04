import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { User } from '../core/schema/user.model';
import { UserController } from '../api/user.controller';
import { UserModule } from '../user.module';
import { UserService } from '../app/user.service';

describe('Module', () => {
	let userController: UserController;
	let userService: UserService;
	let userModule: UserModule;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
		})
			.overrideProvider(getModelToken(User.name))
			.useValue(jest.fn())
			.compile();

		userController = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);
		userModule = module.get<UserModule>(UserModule);
	});

	it('Should be to define user module and dependencies', () => {
		expect(userController).toBeDefined();
		expect(userService).toBeDefined();
		expect(userModule).toBeDefined();
	});
});
