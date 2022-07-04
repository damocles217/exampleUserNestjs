import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../app/user.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User } from '../core/schema/user.model';
import { UserArgs } from '../core/dto/user-create.dto';

describe('UserService', () => {
	let service: UserService;

	const mockJwt = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MongooseModule],
			providers: [
				UserService,
				JwtService,
				{
					provide: getModelToken(User.name),
					useClass: User,
				},
			],
		})
			.overrideProvider(JwtService)
			.useValue(mockJwt)
			.compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', async () => {
		expect(service).toBeDefined();

		const userArgs: UserArgs = {
			name: 'a',
			lastname: 'jfkl',
			password: 'holamundocomoestas',
			confirmPassword: 'holamundocomoestas',
			gender: '0',
			email: 'jfkdla@falsdkw.com',
		};

		const data = await service.createUser(userArgs);

		expect(data).toEqual({ user: null, errors: [], sucess: false });
	});
});
