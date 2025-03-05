import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Favorite } from "./Favorite";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'varchar', nullable: true })
    author?: string;

    @Column({ type: 'varchar' })
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