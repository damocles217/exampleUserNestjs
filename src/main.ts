import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	NestFastifyApplication,
	FastifyAdapter,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from '@fastify/helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';

async function bootstrap() {
	try {
		const app = await NestFactory.create<NestFastifyApplication>(
			AppModule,
			new FastifyAdapter(),
		);

		app.enableCors({
			credentials: true,
			origin: true,
		});
		app.register(fastifyCookie, {
			secret: 'mfda%sl2!vp12@fmelk!a[b04',
		});

		// ! TODO when @fastify/swagger will be compatible in @nestsjs/swagger delete fastify-swagger
		const config = new DocumentBuilder()
			.setTitle('User API')
			.setDescription('This is the doc for user api microservice')
			.setVersion('1.0')
			.addTag('users')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);

		app.register(fastifyHelmet, {
			contentSecurityPolicy: {
				directives: {
					defaultSrc: [`'self'`],
					styleSrc: [`'self'`, `'unsafe-inline'`],
					imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
				},
			},
		});

		await app.listen(3000, '192.168.1.65');
		// await app.listen(3000); // for localhost or https with swagger
	} catch (e) {
		console.log(e);
	}
}
bootstrap();
