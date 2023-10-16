import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mainRoutes from './routes';
// import router from './sourceRoutes';

// Creating Express application
const app: Application = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Defining a simple root route
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Server is running...');
});

app.use('/api/v1', mainRoutes);

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
