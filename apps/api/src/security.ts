import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import express from 'express';

export function applySecurity(app: express.Express) {
  // Basic security headers
  app.use(helmet());

  // CORS policy
  app.use(cors({
    origin: true,
    credentials: true
  }));

  // Rate limiting (anti abuse)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use(limiter);

  // JSON limits
  app.use(express.json({ limit: '1mb' }));
}