export const env = {
	app: {
		base_url: process.env.BASE_URL || 'http://localhost:3010',
		port: Number(process.env.PORT) || 3010,
	},
	database: {
		mongoUri: process.env.MONGO_URL || '',
	},
};
