import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Equipment } from "./equipment";
import { User } from "./user";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tripName!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  hostID!: number;
  @ManyToOne((_type) => User, (user: User) => user.trips)
  @JoinColumn()
  user!: User;

  @Column({ nullable: true })
  tripStartDate!: Date;

  @Column({ nullable: true })
  tripEndDate!: Date;

  @ManyToMany((_type) => Equipment, equipment => equipment.trips)
  @JoinTable({
    name: 'tripEquipment'
  })
  equipment!: Equipment[];

  @ManyToMany((_type) => User, user => user.trip)
  users!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}