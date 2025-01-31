import express, { Response } from 'express';
import path from 'path';

export class ApplicationConfig {
	public static init(application: express.Application): void {
		const staticOptions = {
			setHeaders: (res: Response) => {
				res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
			},
		};

		application.use(
			express.static(path.join(process.cwd(), 'uploads'), staticOptions),
		);
	}
}
