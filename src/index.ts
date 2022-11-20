import dotenv from 'dotenv';
dotenv.config({ debug: true });

import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
// import mongoose from 'mongoose';
import compression from 'compression';
import connectDB from './database';
import { passportInit } from './passport';
import apiRoutes from './routes';

const app = express();

const { PORT } = process.env;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
	return res.json({
		message: "We're enjoying our time here"
	});
});

app.use(apiRoutes);

// catch all requests
app.all('*', (req, res) =>
	res.status(404).json({
		message: `requested url ${req.method} ${req.url} not found`
	})
);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error) {
		console.log('APP_ERROR', error.message);

		if (!res.headersSent) {
			return res.status(500).json({
				message: error.message
			});
		}

		return;
	}

	next();
});

const setupServer = async () => {
	await connectDB();
	passportInit(app);

	app.listen(PORT, () => {
		console.log(`app is live at http://localhost:${PORT}`);
	});
};

setupServer();
