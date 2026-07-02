import { errorHandler, notFound } from '../api/v1/middlewares/error-middleware.js';
import createApp from '../app.js';
import logger from '../utils/logger/color-logger.js';
// import v1Routes from '../api/v1/index.js';

/**
 * Initializes the express application with middleware & routes
 */

export const initializeExpress = () => {
  try {
    logger.info('Initializing Express application...');

    // create express app
    const app = createApp();

    // add request logging middleware
    app.use((req, res, next) => {
      // track response for logging after completion
      const startTime = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.http(req.method, req.originalUrl, res.statusCode);
        logger.info(`Request completed in ${duration}ms`);
        console.log(`Duration: ${duration}ms`);
      });
      next();
    });

    // health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', message: 'server is running' });
    });
    // API version routes
    app.get('/', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Welcome to the Meeting Bullshit Counter API',
      });
    });

    // app.use('/api/vi', v1Routes);
    app.use(notFound);
    app.use(errorHandler);

    logger.success('Express application initialized successfully');
    return app;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Failed to initialize express application', error);
    } else {
      logger.error('Failed to initialize express application', new Error(String(error)));
    }
    throw error;
  }
};
