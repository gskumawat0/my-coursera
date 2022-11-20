import { Request, Response } from 'express';
import { omit } from 'lodash';
import Course from '../models/course';
import { IUser } from '../models/user';

export const getCourses = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
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
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
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
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
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
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
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

export const updateCourseTopic = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
		const { courseId } = req.params;
		const { topicId, topic } = req.body;

		let course = await Course.findOne({ _id: topicId });

		if (!course) {
			throw new Error('Course not found');
		}

		let updateQuery = {};

		if (topicId) {
			const topics = course.topics.map((el) => {
				if (el._id?.equals(topicId)) {
					return topic;
				}
				return el;
			});

			updateQuery = {
				$set: { topics }
			};
		} else {
			updateQuery = {
				$push: { topics: topic }
			};
		}

		const updatedCourse = await Course.findOneAndUpdate(
			{ _id: courseId, user: userId },
			{ ...updateQuery },
			{ new: true }
		);

		return res.json({
			message: 'Course topic updated successfully',
			course: updatedCourse
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const deleteCourse = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
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
