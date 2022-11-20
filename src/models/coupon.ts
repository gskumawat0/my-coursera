import mongoose from 'mongoose';
import crypto from 'crypto';

export interface ICoupon {
	user: mongoose.Types.ObjectId;
	course: mongoose.Types.ObjectId;
	reward: mongoose.Types.ObjectId;
	coupon: string;
	expireAt: Date;
	createdAt?: Date;
	updatedAt?: Date;
	claimedProgress: number;
}

interface ICouponModel extends mongoose.Model<ICoupon> {
	generateCode(): string;
}

const schema = new mongoose.Schema<ICoupon, ICouponModel>(
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
		},
		claimedProgress: Number
	},
	{ timestamps: true }
);

schema.static('generateCode', async function generateCode() {
	try {
		const couponCode = crypto.randomBytes(20).toString('hex').slice(0, 16).toUpperCase();
		const existingCoupon = await this.findOne({ code: couponCode });

		if (existingCoupon) {
			return this.generateCode();
		}
		return couponCode;
	} catch (error) {
		return Promise.reject(error);
	}
});

export default mongoose.model<ICoupon, ICouponModel>('Coupon', schema, 'coupons');
