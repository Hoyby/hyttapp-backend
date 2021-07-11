import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Trip } from "./trip";
import { Equipment } from "./equipment";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  premissionLevel!: number;

  @Column()
  email!: string;

  @OneToMany((_type) => Trip, (trip: Trip) => trip.user)
  trips!: Trip[];

  @ManyToMany((_type) => Equipment, equipment => equipment.users)
  @JoinTable({
    name: 'userEquipment'
  })
  equipment!: Equipment[];

  @ManyToMany((_type) => Trip, trip => trip.user)
  @JoinTable({
    name: 'tripParticipants'
  })
  trip!: Trip[];

  @ManyToOne(type => User, user => user.childUser)
  parentUser!: User;

  @OneToMany(type => User, user => user.parentUser)
  childUser!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}