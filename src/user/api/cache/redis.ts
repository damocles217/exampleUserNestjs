import {
	createClient,
	RedisClientOptions,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from 'redis';

const createdRediConnection = () => {
	const opts: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts> = {
		url: 'redis://192.168.1.65:6379',
	};
	const client = createClient(opts);

	(async () => {
		await client.connect();
	})();

	return client;
};

const newClient = createdRediConnection();
export default newClient;
