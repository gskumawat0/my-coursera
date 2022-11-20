import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from './models/user';
import { Express } from 'express';

const { JWT_SECRET } = process.env;

const generateStrategy = (allowedRole: string) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: JWT_SECRET
	};

	return new JwtStrategy(options, async (jwtPayload, cb) => {
		try {
			const user = await User.findOne({ email: jwtPayload.data.email }).lean();

			if (!user) {
				throw new Error('bad request');
			}

			if (user.role !== allowedRole) {
				throw new Error('bad request');
			}

			return cb(null, user);
		} catch (error) {
			return cb(error, false);
		}
	});
};

const passportInit = (app: Express) => {
	// auth strategies
	passport.use('employee', generateStrategy('EMPLOYEE'));
	passport.use('admin', generateStrategy('ADMIN'));
	passport.use('superAdmin', generateStrategy('SUPER_ADMIN'));

	// passport config
	app.use(passport.initialize());
};

export { passportInit };
