import { Error } from './error';

export type User = {
	_id: string;

	name: string;

	lastname: string;

	email: string;

	password: string;

	userId: string;

	code_auth: string;

	admin: number;

	url_photo: string;

	gender: string;

	createdAt?: Date;

	updatedAt?: Date;
};

export type ResponseUser = {
	user: User | null;
	errors: Error[];
	success: boolean;
};
