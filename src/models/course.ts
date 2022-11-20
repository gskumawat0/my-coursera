import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
	user: mongoose.Schema.Types.ObjectId;
	title: string;
	description: string;
	topics: {
		title: string;
		description: string;
		duration: string;
		video: string;
		supplementryMaterial: { type: string; link: string }[];
		quizzes: { question: string; isMultipleAnswer: boolean; answers: string[] };
	}[];
	category: string;
	totalDuration: string;
	createdAt?: Date;
	updatedAt?: Date;
	approvedAt?: Date;
	lastApprovedAt?: Date;
	status: 'APPROVED' | 'PENDING';
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
		approvedAt: Date,
		lastApprovedAt: Date,
		status: {
			type: String,
			default: 'PENDING'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Course', schema, 'courses');
