import logger from '../utils/logger/color-logger.js';
import { initializeExpress } from './express-loader.js';
import http from 'http';
import { Server } from 'http';
import { connectToDB } from './mongoose-loader.js';

/***
 * initialize core application loaders in the correct order
 * focused on express for initial setup
 */

export const initializeApp = async () => {
  try {
    logger.info('Initializing application...');

    // Initialize MongoDB first
    logger.info('Initializing database connection...');
    const dbConnection = await connectToDB();
    logger.success('Database connection established');

    //Initialize Express application
    logger.info('Initializing Express application...');
    const app = initializeExpress();
    logger.success('Express application initialized');

    // create HTTP server
    const server = http.createServer(app);

    // start server
    server.listen(process.env.PORT || 5000, () => {
      logger.success(`Server running on port ${process.env.PORT || 5000}`);
    });

    logger.success('Application startup completed successfully');
    return { app, server, dbConnection };
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Application initialization failed', error);
    } else {
      logger.error('Application initialization failed', new Error(String(error)));
    }
    throw error;
  }
};

/***
 * Shuts down the application gracefully
 */

export const shutdownApp = async (server: Server) => {
  logger.info('Initiating graceful shutdown...');

  if (server) {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          logger.error('Error during shutdown', err);
          return reject(err);
        }
        logger.info('HTTP server closed');
        resolve();
      });
    });
  }

  try {
    //close mongoDB connection
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');
    }
  } catch (err: unknown) {
    logger.info(
      'Error during MongoDB disconnection: ' + (err instanceof Error ? err.message : String(err)),
    );
  }
  logger.info('Shutdown complete');
};
