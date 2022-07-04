import { Module } from '@nestjs/common';
import { UserController } from './api/user.controller';
import { UserService } from './app/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema, User } from './core/schema/user.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
		JwtModule.register({
			secret: process.env.SECRET_JWT || '@f7LMw&F}$aPa/n`_c3&jkL*:V?Qf',
		}),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
