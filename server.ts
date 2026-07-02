import dotenv from 'dotenv';
import { initializeApp, shutdownApp } from './src/loaders/index-loader.js';
import { logger } from './src/utils/logger/app-logger.js';
// import type { NodeJS } from 'node:process';

// Load environment variables
dotenv.config();

// start server
const startServer = async () => {
  try {
    // Initialize application with Express
    const { server } = await initializeApp();

    // Handle graceful shutdown
    const gracefulShutdown = async (signal: NodeJS.Signals) => {
      logger.info(`${signal} received. shutting down gracefully...`);
      await shutdownApp(server);
      process.exit(0);
    };

    // Handle termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      logger.error('UNHANDLED REJECTION', err);
      gracefulShutdown('SIGTERM');
    });

    // Handle uncaught exception
    process.on('uncaughtException', (err) => {
      logger.error('UNCAUGHT EXCEPTION', err);
      gracefulShutdown('SIGINT');
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

// Start everything
startServer();