import { Config } from './config';
import { env } from './env';
import http from 'http';

export class App {
	public static async run(): Promise<void> {
		const port = env.app.port;
		const app = await Config.init();
		const server = http.createServer(app);
		server.listen(port, () => {
			console.log(`App listening on port ${port}`);
		});
	}
}
