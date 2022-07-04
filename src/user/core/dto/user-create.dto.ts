export class UserArgs {
	name: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
	gender: string;
}

export class UserLog {
	email: string;
	password: string;
}

export class UserUpdate {
	name: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
	passwordChecker: string;
	gender: string;
}

export class UserDeleteArgs {
	password: string;
	email: string;
}
