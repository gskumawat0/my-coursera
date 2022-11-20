import { Request, Response } from 'express';

export const getCourses = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const reviewCourse = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
