import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mainRoutes from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

// Creating Express application
const app: Application = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // cookie parser

// Defining a simple root route
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running...');
});

// Mount the router for API endpoints under '/api/v1'
app.use('/api/v1', mainRoutes);

// Global error handler
app.use(globalErrorHandler); // ei global error handler ke uporer middleware section e rakhle hobe na. API endpoints er niche rakhte hobe.

// handle not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: '404 not found.',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Route not found.',
      },
    ],
  });
});

export default app;
