import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { authMiddleware } from '../middlewares/auth';
import multer from 'multer';
import { config } from '../config';

const bookRoutes = Router();
const bookController = new BookController();

const upload = multer({
  dest: config.upload.directory,
  limits: {
    fileSize: config.upload.maxSize
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
});

bookRoutes.use(authMiddleware);

bookRoutes.post('/', upload.single('file'), bookController.create);
bookRoutes.get('/', bookController.list);
bookRoutes.get('/:id', bookController.show);
bookRoutes.delete('/:id', bookController.delete);

export { bookRoutes };