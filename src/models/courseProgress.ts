import mongoose from 'mongoose';

export interface ICourseProgress extends mongoose.Document {
	user: mongoose.Schema.Types.ObjectId;
	course: mongoose.Schema.Types.ObjectId;
	progress: {
		topicId: mongoose.Schema.Types.ObjectId;
		completedDuration: string;
	}[];
	lastProgressDate?: Date;
	completedTopics: number;
	completedDuration: string;
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
		lastProgressDate: Date
	},
	{ timestamps: true }
);

export default mongoose.model('Course', schema, 'courses');
