export function nameValidator(v) {
	return /([a-zA-Z._-\s][^0-9\n])\w+/.test(v);
}

export function lastnameValidator(v) {
	return /([a-zA-Z._-\s][^0-9\n])\w+/.test(v);
}

export function emailValidator(v) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		v,
	);
}

export function imageValidator(v) {
	return /\w*\.(gif|jpe?g|png)$|(^$)/g.test(v);
}
