import { Request, Response } from 'express';

export const getCourses = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const startCourse = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const updateProgress = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const deleteProgress = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const completeCourse = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
