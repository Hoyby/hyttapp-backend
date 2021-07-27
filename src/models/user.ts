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
} from 'typeorm'
import { Trip } from './trip'
import { Equipment } from './equipment'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    email!: string

    @Column({ nullable: false })
    password!: string

    @Column({ nullable: false })
    name!: string

    @Column({ default: 0 })
    premissionLevel!: number

    @OneToMany((_type) => Trip, (trip: Trip) => trip.user)
    trips!: Trip[]

    @ManyToMany((_type) => Equipment, (equipment) => equipment.users)
    @JoinTable({
        name: 'userEquipment',
    })
    equipment!: Equipment[]

    @ManyToMany((_type) => Trip, (trip) => trip.user)
    @JoinTable({
        name: 'tripParticipants',
    })
    trip!: Trip[]

    //TODO self reference

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
