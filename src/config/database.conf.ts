import mongoose from 'mongoose';
import { env } from '../env';

const dbConfig = env.database;

export const connectToDatabase = async () => {
	try {
		console.log(dbConfig.mongoUri);
		await mongoose.connect(dbConfig.mongoUri);
		console.log('Connect to MongoDb success');
	} catch (error) {
		throw error;
	}
};
