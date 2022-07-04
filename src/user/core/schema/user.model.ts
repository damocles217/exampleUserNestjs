import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
	emailValidator,
	imageValidator,
	lastnameValidator,
	nameValidator,
} from '../validations/user.validator';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
	@Prop({
		required: [true, 'El nombre es requerido'],
		trim: true,
		validate: {
			validator: nameValidator,
			message: (props) =>
				`Por favor ponga un nombre valido, ${props.value} no lo es`,
		},
	})
	name: string;

	@Prop({
		required: [true, 'El apellido es requerido'],
		trim: true,
		validate: {
			validator: lastnameValidator,
			message: (props) =>
				`Por favor ponga apellidos validos, ${props.value} no lo es`,
		},
	})
	lastname: string;

	@Prop({
		required: [true, 'El nombre es requerido'],
		trim: true,
		unique: true,
		validate: {
			validator: emailValidator,
			message: (props) => `${props.value} no es un correo valido, ponga otro`,
		},
	})
	email: string;

	@Prop({
		required: [true, 'La contraseña es necesaria'],
		trim: true,
		unique: true,
	})
	password: string;

	@Prop({
		trim: true,
		unique: true,
	})
	userId: string;

	@Prop({
		default: '',
		validate: {
			validator: imageValidator,
			message: (props) =>
				`${props.value} no es un formato de imagen valido, use (jpg,jpeg,png,gif)`,
		},
	})
	url_photo: string;

	@Prop({
		unique: true,
	})
	code_auth: string;

	@Prop({
		default: 0,
	})
	admin: number;

	@Prop({
		default: '1',
	})
	gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
