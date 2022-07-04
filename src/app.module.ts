import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(
			'mongodb+srv://admin:dam0cl3s084@example.hief2.mongodb.net/example?retryWrites=true&w=majority',
		),
	],
})
export class AppModule {}
