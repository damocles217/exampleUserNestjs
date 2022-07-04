export const logOutUser = async (
	redisClient: any,
	code_auth: string,
): Promise<void> => {
	redisClient.del(`user-log-${code_auth}`);
};
