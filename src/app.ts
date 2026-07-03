import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { requestIdMiddleware } from './api/v1/middlewares/requestId-middleware.js';

/**
 * create and configuration the express application
 * pure express configuration without business logic and initialization
 */

const createApp = () => {
  // create express application

  const app = express();

  // custom middleware
  app.use(requestIdMiddleware);

  //built-in middleware

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  //third-party middleware
  const allowedOrigins = [
    'http://localhost:8000',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
    process.env.API_URL,
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    }),
  );

  app.use(helmet());
  app.use(compression());

  // Rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    // max: 100, limit each IP to 100 request per windowMs
    message: 'Too many request from this IP, please try again after 15 minutes',
  });
  app.use('/api/v1', apiLimiter);

  return app;
};

export default createApp;
