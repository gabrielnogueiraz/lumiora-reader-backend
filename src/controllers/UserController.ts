import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../database/connection';
import { User } from '../entities/User';
import { config } from '../config';

interface TokenPayload {
  id: string;
}

export class UserController {
  public create = async (request: Request, response: Response): Promise<void> => {
    const { name, email, password } = request.body;

    const userRepository = AppDataSource.getRepository(User);
    
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;

     response.status(201).json(userWithoutPassword);
     return
  }

  public login = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Email/senha incorretos');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Email/senha incorretos');
    }

    const token = sign(
      { id: user.id },
      config.jwt.secret,
      { 
        expiresIn: '24h'
      }
    );

    const { password: _, ...userWithoutPassword } = user;

     response.json({ 
      user: userWithoutPassword, 
      token 
    });
    return
  }

  public profile = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.user;

    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({ 
      where: { id },
      relations: ['books', 'favorites']
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const { password: _, ...userWithoutPassword } = user;

    response.json(userWithoutPassword);
    return 
  }
}