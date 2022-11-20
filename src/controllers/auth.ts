import { Request, Response } from 'express';

export const signup = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const signin = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const signinWithToken = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
