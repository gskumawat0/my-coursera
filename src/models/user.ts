import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IUser {
	name: string;
	password: string;
	email: string;
	role: 'ADMIN' | 'SUPER_ADMIN' | 'EMPLOYEE';
	createdAt?: Date;
	updatedAt?: Date;
	_id?: mongoose.Types.ObjectId;
}

interface IUserModel extends mongoose.Model<IUser> {
	createHashedPwd(password: string): string;
	comparePwd(password: string, hasedPassword: string): string;
	createAccessToken(): string;
}

const schema = new mongoose.Schema<IUser, IUserModel>(
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

schema.static('createHashedPwd', function createHashedPwd(password) {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	} catch (error) {
		return Promise.reject(error);
	}
});

schema.static('comparePwd', async function (password, hasedPassword) {
	try {
		const isMatched = await bcrypt.compareSync(password, hasedPassword);
		return isMatched;
	} catch (error) {
		return Promise.reject(error);
	}
});

schema.static('createAccessToken', async function createAccessToken() {
	try {
		const buffer = crypto.randomBytes(3);
		const token = parseInt(buffer.toString('hex'), 16).toString().substr(0, 6);
		return token;
	} catch (error) {
		return Promise.reject(error);
	}
});

export default mongoose.model<IUser, IUserModel>('User', schema, 'users');
