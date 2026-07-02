import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

/**
 * create and configuration the express application
 * pure express configuration without business logic and initialization
 */

const createApp = () => {
  // create express application

  const app = express();

  //built-in middleware

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  //third-party middleware
  const allowedOrigins = ['http://localhost:5173'];

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