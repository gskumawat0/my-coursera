import mongoose from 'mongoose';

export interface IReward {
	user: mongoose.Types.ObjectId;
	course: mongoose.Types.ObjectId;
	title: string;
	description: string;
	milestone: number;
	expiresIn: number;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new mongoose.Schema<IReward>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
		title: {
			type: String
		},
		description: {
			type: String
		},
		milestone: {
			type: Number
		},
		expiresIn: {
			// in seconds
			type: Number
		},
		createdAt: {
			type: Date
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Reward', schema, 'rewards');
