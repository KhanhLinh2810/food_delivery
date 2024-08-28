import path from 'path';
import * as dotenv from 'dotenv';
// Cần gọi dotenv.config() trước khi sử dụng các biến môi trường
dotenv.config({
	path: path.join(process.cwd(), '.env'),
});
import { App } from './src/app';

async function main() {
	try {
		await App.run();
	} catch (error) {
		const message = (error as Error).message || '';
		console.log(`Error while running the application ${message}`);
	}
}

main();
