import 'dotenv/config';
import path from 'path';

const BASE_PATH = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.resolve(__dirname, '..', '..');

export const config = {
  app: {
    port: process.env.PORT || 3333,  
    apiUrl: process.env.API_URL || 'http://localhost:3333',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '24h' 
  },
  upload: {
    directory: path.resolve(BASE_PATH, 'uploads'),
    maxSize: 1024 * 1024 * 10, 
  }
};