import mongoose from 'mongoose';

export interface ICoupon {
	user: mongoose.Types.ObjectId;
	course: mongoose.Types.ObjectId;
	reward: mongoose.Types.ObjectId;
	coupon: string;
	expireAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new mongoose.Schema<ICoupon>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
		reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
		coupon: {
			type: String
		},
		expireAt: {
			type: Date
		},
		createdAt: {
			type: Date
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Token', schema, 'tokens');
