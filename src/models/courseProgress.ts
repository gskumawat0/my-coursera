import mongoose from 'mongoose';

export interface ICourseProgress {
	user: mongoose.Types.ObjectId;
	course: mongoose.Types.ObjectId;
	progress: mongoose.Types.DocumentArray<{
		topicId: mongoose.Types.ObjectId;
		completedDuration: number;
	}>;
	lastProgressDate?: Date;
	completedDuration: number;
	isCompleted: boolean;
}

const schema = new mongoose.Schema<ICourseProgress>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', index: true },
		progress: [
			{
				topicId: { type: mongoose.Schema.Types.ObjectId },
				completedDuration: Number // in seconds
			}
		],
		completedDuration: Number, // in seconds
		lastProgressDate: Date,
		isCompleted: Boolean
	},
	{ timestamps: true }
);

export default mongoose.model('CourseProgress', schema, 'courseProgress');
