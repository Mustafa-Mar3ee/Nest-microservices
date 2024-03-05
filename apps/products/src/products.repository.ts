import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Product } from "./models/product.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";

@Injectable()
export class ProductsRepository extends AbstractRepository<Product> {
    protected readonly logger = new Logger(ProductsRepository.name)
    constructor(
        @InjectRepository(Product, "productConnection") productsRepository: Repository<Product>,
        @InjectEntityManager('productConnection') entityManager: EntityManager
    ) {
        super(productsRepository, entityManager)
    }


}