import mongoose from 'mongoose';

const { DB_URI } = process.env;

const connectDB = async () => {
	await mongoose.connect(DB_URI as string);
};

export default connectDB;
