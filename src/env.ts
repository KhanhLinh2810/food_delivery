export const env = {
	app: {
		base_url: process.env.BASE_URL || 'http://localhost:3010',
		port: Number(process.env.PORT) || 3010,
		jwtExpiredIn: process.env['JWT_EXPIRED_IN'] || '30d',
		jwtSecret: process.env.JWT_SECRET || '123456',
		refreshTokenExpiredIn: process.env.REFRESH_TOKEN_EXPIRED_IN || '30d',
		refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '123456',
	},
	database: {
		mongoUri: process.env.MONGO_URL || '',
	},
};
