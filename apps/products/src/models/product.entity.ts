import { AbstractEntity } from "@app/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('productConnection')
export class Product {

    constructor(entity: Partial<any>) {
        Object.assign(this, entity)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    userId: string
}

