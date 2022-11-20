import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
// import mongoose from 'mongoose';
import compression from 'compression';
import connectDB from './database';
import { passportInit } from './passport';

dotenv.config({});

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

// catch all requests
app.all('*', (req, res) =>
	res.status(404).json({
		message: `requested url ${req.method} ${req.url} not found`
	})
);

const setupServer = async () => {
	await connectDB();
	passportInit(app);

	app.listen(PORT, () => {
		console.log(`app is live at http://localhost:${PORT}}`);
	});
};

setupServer();
