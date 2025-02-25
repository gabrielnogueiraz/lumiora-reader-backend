import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Favorite } from "./Favorite";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    author?: string;

    @Column()
    filePath!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.books)
    user!: User;

    @OneToMany(() => Favorite, favorite => favorite.book)
    favorites!: Favorite[];
}