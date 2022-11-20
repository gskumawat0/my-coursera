import { Request, Response } from 'express';
import { omit } from 'lodash';
import Course from '../models/course';

export const getCourses = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const courses = await Course.find({ user: userId });

		return res.json({
			courses
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const addCourse = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const courseData = req.body;
		const course = await Course.create({ ...courseData, status: 'PENDING', user: userId });

		return res.json({
			message: 'Course created successfully',
			course
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const getCourse = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const { courseId } = req.params;
		const course = await Course.findOne({ user: userId, _id: courseId });

		return res.json({
			course
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const updateCourse = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const { courseId } = req.params;
		const courseData = omit(req.body, ['status']);

		const course = await Course.findOneAndUpdate(
			{ _id: courseId, user: userId },
			{ $set: { ...courseData } },
			{ new: true }
		);

		return res.json({
			message: 'Course updated successfully',
			course
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

// TODO: complete it
export const updateCourseTopic = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const { courseId } = req.params;
		const courseData = req.body;

		const course = await Course.findOneAndUpdate(
			{ _id: courseId, user: userId },
			{ $set: { ...courseData } },
			{ new: true }
		);

		return res.json({
			message: 'Course updated successfully',
			course
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const deleteCourse = async (req: Request, res: Response) => {
	try {
		const userId = '';
		const { courseId } = req.params;

		await Course.findOneAndDelete({ _id: courseId, user: userId });

		return res.json({
			message: 'Course Deleted successfully'
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
