import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import Course from '../models/course';
import Coupon from '../models/coupon';
import Reward from '../models/reward';
import CourseProgress from '../models/courseProgress';
import { IUser } from '../models/user';

export const getCourses = async (req: Request, res: Response) => {
	try {
		const { sort = '-_id' } = req.query;

		const courses = await Course.find({ status: 'APPROVED' })
			.sort(sort as string)
			.lean();

		return res.json({
			courses
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const startCourse = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
		const { courseId } = req.params;

		const course = await Course.findOne({ _id: courseId });

		if (!course) {
			throw new Error('Course not found');
		}

		const progress = await CourseProgress.create({
			user: userId,
			course: courseId,
			progress: [
				{
					topicId: course.topics[0]._id,
					completedDuration: 0
				}
			],
			lastProgressDate: Date.now(),
			completedDuration: 0
		});

		return res.json({
			message: 'Course started successfully',
			progress
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const updateProgress = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
		const { courseId } = req.params;
		const { topicId, completedDuration } = req.body;

		const p1 = Course.findOne({ _id: courseId });
		const p2 = CourseProgress.findOne({ user: userId, course: courseId }).lean();

		const [course, previousProgress] = await Promise.all([p1, p2]);

		if (!course) {
			throw new Error('Course not found');
		}

		let progress = null;

		if (!previousProgress) {
			progress = await CourseProgress.create({
				user: userId,
				course: courseId,
				progress: [
					{
						topicId: topicId,
						completedDuration: 0
					}
				],
				lastProgressDate: Date.now(),
				completedDuration: 0
			});
		} else {
			const topic = previousProgress.progress.find((el) => el.topicId.equals(topicId));

			let updateQuery = {};
			let updatedDuration = previousProgress.completedDuration;

			if (topic) {
				const newProgress = previousProgress.progress.map((el) => {
					if (el.topicId.equals(topicId)) {
						return {
							...el,
							completedDuration
						};
					}

					return el;
				});

				const increasedDuration = completedDuration - topic.completedDuration;
				updatedDuration = previousProgress.completedDuration + increasedDuration;

				updateQuery = {
					$inc: {
						completedDuration: increasedDuration
					},
					$set: {
						progress: newProgress,
						isCompleted: updatedDuration > course.totalDuration
					}
				};
			} else {
				updatedDuration = previousProgress.completedDuration + completedDuration;

				updateQuery = {
					$push: {
						progress: {
							completedDuration,
							topicId
						}
					},
					$inc: {
						completedDuration
					},
					$set: {
						isCompleted: updatedDuration > course.totalDuration
					}
				};
			}

			progress = await CourseProgress.findOneAndUpdate(
				{ user: userId, course: courseId },
				{
					...updateQuery
				},
				{
					new: true
				}
			);
		}

		return res.json({
			message: 'Course progress updated successfully',
			progress
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const deleteProgress = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
		const { courseId } = req.params;

		await CourseProgress.findOneAndDelete({ user: userId, course: courseId });

		return res.json({
			message: 'Course progress reset successfully'
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const claimReward = async (req: Request, res: Response) => {
	try {
		const { _id: userId } = req.user as Pick<IUser, 'email' | '_id'>;
		const { courseId, rewardId } = req.params;

		const p1 = Course.findOne({ _id: courseId }).lean();

		const p2 = CourseProgress.findOne({ user: userId, course: courseId }).lean();

		const p3 = Reward.findOne({ _id: rewardId }).lean();

		const p4 = Coupon.findOne({ user: userId, course: courseId, reward: rewardId }).lean();

		const [course, progress, reward, lastCoupon] = await Promise.all([p1, p2, p3, p4]);

		if (lastCoupon) {
			throw new Error('Reward already claimed');
		}

		if (!course) {
			throw new Error('Course not found');
		}

		if (!progress) {
			throw new Error('Course not started yet');
		}

		if (!reward) {
			throw new Error('Reward is not unlocked yet');
		}

		const completedPerc = (progress.completedDuration * 100) / course.totalDuration;

		if (completedPerc < reward.milestone) {
			throw new Error('Reward is not unlocked yet');
		}

		const couponCode = await Coupon.generateCode();
		const coupon = await Coupon.create({
			user: userId,
			reward: rewardId,
			course: courseId,
			coupon: couponCode,
			claimedProgress: completedPerc,
			expireAt: DateTime.now().setZone().plus({ seconds: reward.expiresIn }).valueOf()
		});

		return res.json({
			message: 'Reward claimed successfully',
			coupon
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
