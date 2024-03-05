import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('userConnection')
export class User {

    constructor(entity: Partial<any>) {
        Object.assign(this, entity)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, { cascade: true })
    @JoinTable()
    roles?: Role[];

}

