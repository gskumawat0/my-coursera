import mongoose from 'mongoose';

export interface IToken {
	user: mongoose.Types.ObjectId;
	token: string;
	expireAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new mongoose.Schema<IToken>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		token: {
			type: String
		},
		expireAt: {
			type: Date
		},
		createdAt: {
			type: Date,
			expires: 7 * 24 * 60 * 60
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Token', schema, 'tokens');
