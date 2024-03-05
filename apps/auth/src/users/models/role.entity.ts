import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    constructor(entity: Partial<any>) {
        Object.assign(this, entity)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}