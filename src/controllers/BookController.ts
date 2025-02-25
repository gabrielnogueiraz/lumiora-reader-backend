import { Request, Response } from 'express';
import { AppDataSource } from '../database/connection';
import { Book } from '../entities/Book';

export class BookController {
  async create(request: Request, response: Response): Promise<void> {
    const { title, author } = request.body;
    const { id: userId } = request.user;
    const file = request.file;

    if (!file) {
      throw new Error('PDF não fornecido');
    }

    const bookRepository = AppDataSource.getRepository(Book);

    const book = bookRepository.create({
      title,
      author,
      filePath: file.path,
      user: { id: userId }
    });

    await bookRepository.save(book);

    response.status(201).json(book);
    return 
  }

  async list(request: Request, response: Response): Promise<void> {
    const { id: userId } = request.user;

    const bookRepository = AppDataSource.getRepository(Book);
    
    const books = await bookRepository.find({
      where: { user: { id: userId } },
      relations: ['favorites']
    });

    response.json(books);
    return 
  }

  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { id: userId } = request.user;

    const bookRepository = AppDataSource.getRepository(Book);
    
    const book = await bookRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['favorites']
    });

    if (!book) {
      throw new Error('Livro não encontrado');
    }

    response.json(book);
    return 
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { id: userId } = request.user;

    const bookRepository = AppDataSource.getRepository(Book);
    
    const book = await bookRepository.findOne({
      where: { id, user: { id: userId } }
    });

    if (!book) {
      throw new Error('Livro não encontrado');
    }

    await bookRepository.remove(book);

    response.status(204).send();
    return 
  }
}