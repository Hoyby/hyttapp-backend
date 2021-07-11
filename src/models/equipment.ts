import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";
import { Trip } from "./trip";
import { User } from "./user";

@Entity()
export class Equipment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    item!: string;

    //needed?
    @ManyToMany((_type) => User, user => user.equipment)
    users!: User[];

    //needed?
    @ManyToMany((_type) => Trip, trip => trip.equipment)
    trips!: Trip[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}