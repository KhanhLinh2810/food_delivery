import express, { Response } from 'express';
import path from 'path';
export class ApplicationConfig {
	public static init(application: express.Application): void {
		// --- Middle wares
		application.use(express.json({ limit: '50mb' }));
		application.use(
			express.urlencoded({
				limit: '50mb',
				extended: true,
			}),
		);
		application.use(express.raw({ limit: '50mb' }));
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
