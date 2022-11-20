import mongoose from 'mongoose';

export interface IUser {
	name: string;
	password: string;
	email: string;
	role: 'ADMIN' | 'SUPER_ADMIN' | 'EMPLOYEE';
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new mongoose.Schema<IUser>(
	{
		name: { type: String },
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			index: true
		},
		role: {
			type: String,
			default: 'EMPLOYEE'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('User', schema, 'users');
