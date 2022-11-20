import mongoose from 'mongoose';

export interface ICourseProgress {
	user: mongoose.Types.ObjectId;
	course: mongoose.Types.ObjectId;
	progress: {
		topicId: mongoose.Types.ObjectId;
		completedDuration: string;
	}[];
	lastProgressDate?: Date;
	completedTopics: number;
	completedDuration: string;
	isCompleted: boolean;
}

const schema = new mongoose.Schema<ICourseProgress>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', index: true },
		progress: [
			{
				topicId: { type: mongoose.Schema.Types.ObjectId },
				completedDuration: String
			}
		],
		completedTopics: String,
		completedDuration: String,
		lastProgressDate: Date,
		isCompleted: Boolean
	},
	{ timestamps: true }
);

export default mongoose.model('Course', schema, 'courses');
