import mongoose from 'mongoose';

export const createConnection = async (): Promise<typeof mongoose> => {
  //get mongodb URI from env
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log('MONGODB URI is', MONGODB_URI);

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      autoIndex: process.env.NODE_ENV !== 'production',
    });
    console.log('MongoDB connected successfully');
    return connection;
  } catch (err) {
    console.log('MongoDB connection error:', err);
    throw err;
  }
};
