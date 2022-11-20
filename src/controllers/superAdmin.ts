import { Request, Response } from 'express';
import User from '../models/user';
import Token from '../models/token';

export const getCourses = async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const reviewCourse = async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const generateSigninToken = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User not found');
		}

		const token = await User.createAccessToken();

		const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
		await Token.create({
			user: user._id,
			token,
			expireAt: SEVEN_DAYS
		});

		return res.json({
			message: 'Access token generated',
			url: `/auth/signin/token?token=${token}&uid=${user._id}`
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
