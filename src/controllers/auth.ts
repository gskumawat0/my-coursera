import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Token from '../models/token';

const { JWT_SECRET } = process.env;

export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role = 'EMPLOYEE' } = req.body;
		const hashedPassword = await User.createHashedPwd(password);
		await User.create({ name, email, role, password: hashedPassword });

		return res.json({
			message: 'User registered successfully'
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const signin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('invalid credentails');
		}

		const isPwdMatched = await User.comparePwd(password, user.password);
		if (!isPwdMatched) {
			throw new Error('invalid credentails');
		}

		const jwtData = {
			email: user.email,
			_id: user._id
		};

		const token = await jwt.sign(
			{
				data: jwtData
			},
			JWT_SECRET as string,
			{
				expiresIn: '1y'
			}
		);

		return res.json({
			message: `welcome back!! ${user.name}`,
			token,
			user
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};

export const signinWithToken = async (req: Request, res: Response) => {
	try {
		const { uid, token } = req.query;

		if (!uid || !token) {
			throw new Error('invalid credentials');
		}

		const dbToken = await Token.findOne({ token, user: uid });

		if (!dbToken) {
			throw new Error('invalid access token');
		}

		if (new Date(dbToken.expireAt).valueOf() < Date.now()) {
			await Token.findOneAndDelete({ _id: dbToken._id });
			throw new Error('invalid access token');
		}

		const user = await User.findOne({ _id: uid });

		if (!user) {
			throw new Error('invalid access token');
		}

		const jwtData = {
			email: user.email,
			_id: user._id
		};

		const jwtToken = await jwt.sign(
			{
				data: jwtData
			},
			JWT_SECRET as string,
			{
				expiresIn: '1y'
			}
		);

		return res.json({
			message: `welcome back!! ${user.name}`,
			token: jwtToken,
			user
		});
	} catch (error: any) {
		return res.status(500).json({
			message: error.message
		});
	}
};
