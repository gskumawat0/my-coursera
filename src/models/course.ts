import mongoose from 'mongoose';

export interface ICourse {
	user: mongoose.Types.ObjectId;
	title: string;
	description: string;
	thumbnail: string;
	promoVideo: string;
	topics: mongoose.Types.DocumentArray<{
		topicNo: number;
		title: string;
		description: string;
		duration: string;
		video: string;
		supplementryMaterial: mongoose.Types.DocumentArray<{ type: string; link: string }>;
		quizzes: mongoose.Types.DocumentArray<{ question: string; isMultipleAnswer: boolean; answers: string[] }>;
	}>;
	category: string;
	totalDuration: number; // in seconds
	createdAt?: Date;
	updatedAt?: Date;
	lastReviewedAt?: Date;
	status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

const schema = new mongoose.Schema<ICourse>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: {
			type: String
		},
		description: {
			type: String
		},
		topics: [
			{
				topicNo: Number,
				title: String,
				description: String,
				duration: String,
				video: String,
				supplementryMaterial: [
					{
						type: { type: String, link: String }
					}
				],
				quizzes: [
					{
						type: { type: String, answers: [String], isMultipleAnswer: Boolean }
					}
				]
			}
		],
		category: String,
		totalDuration: String,
		lastReviewedAt: Date,
		status: {
			type: String,
			default: 'PENDING'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Course', schema, 'courses');
