import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';

import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { config } from './config';
import { AppDataSource } from './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/api', routes);

app.use(errorHandler);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

AppDataSource.initialize().then(() => {
  const server = app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
  });
}).catch(error => {
  console.error('Error during Data Source initialization:', error);
});

export { app };