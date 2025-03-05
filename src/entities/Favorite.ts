import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.favorites)
    user!: User;

    @ManyToOne(() => Book, book => book.favorites)
    book!: Book;
}