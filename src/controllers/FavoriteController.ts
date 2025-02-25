import { Request, Response } from 'express';
import { AppDataSource } from '../database/connection';
import { Favorite } from '../entities/Favorite';

export class FavoriteController {
  async create(request: Request, response: Response): Promise<void> {
    const { bookId } = request.body;
    const { id: userId } = request.user;

    const favoriteRepository = AppDataSource.getRepository(Favorite);

    const favoriteExists = await favoriteRepository.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId }
      }
    });

    if (favoriteExists) {
      throw new Error('Livro já está nos favoritos');
    }

    const favorite = favoriteRepository.create({
      user: { id: userId },
      book: { id: bookId }
    });

    await favoriteRepository.save(favorite);

    response.status(201).json(favorite);
    return 
  }

  async list(request: Request, response: Response): Promise<void> {
    const { id: userId } = request.user;

    const favoriteRepository = AppDataSource.getRepository(Favorite);
    
    const favorites = await favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['book']
    });

    response.json(favorites);
    return 
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { id: userId } = request.user;

    const favoriteRepository = AppDataSource.getRepository(Favorite);
    
    const favorite = await favoriteRepository.findOne({
      where: { id, user: { id: userId } }
    });

    if (!favorite) {
      throw new Error('Favorito não encontrado');
    }

    await favoriteRepository.remove(favorite);

    response.status(204).send();
    return 
  }
}