import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import User from '../models/user';
import Token from '../models/token';
import Course from '../models/course';

interface IAdminCourseQuery {
	status?: string;
}

export const getCourses = async (req: Request, res: Response) => {
	try {
		const { status } = req.query;
		const query: IAdminCourseQuery = {};

		if (status) {
			query.status = status as string;
		}

		const courses = await Course.find({ ...query });

		return res.json({
			courses
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const reviewCourse = async (req: Request, res: Response) => {
	try {
		const { courseId } = req.params;
		const { status } = req.body;

		const data = {
			status,
			lastReviewedAt: Date.now()
		};

		const course = await Course.findOneAndUpdate({ _id: courseId }, { $set: { ...data } }, { new: true });

		return res.json({
			course
		});
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

		await Token.create({
			user: user._id,
			token,
			expireAt: DateTime.now().plus({ days: 7 }).valueOf()
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
