import mongoose from 'mongoose';
import logger from '../utils/logger/color-logger.js';
import { createConnection } from '../config/db.js';

export const setupEvents = (): void => {
  // add event listeners for connection status
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection failed', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB connection failed');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed due to app termination');
    process.exit(0);
  });
};

export const connectToDB = async (): Promise<typeof mongoose> => {
  try {
    const connection = await createConnection();
    setupEvents();
    logger.success(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error('MongoDB connection failed:', err);
    throw error;
  }
};
