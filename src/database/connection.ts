import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { Favorite } from "../entities/Favorite";
import path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(__dirname, '..', '..', 'database.sqlite'),
    synchronize: true, 
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Book, Favorite],
    subscribers: [],
    migrations: [],
});