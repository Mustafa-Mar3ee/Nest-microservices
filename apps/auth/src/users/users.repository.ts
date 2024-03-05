import { AbstractRepository } from "@app/common";
import { User } from "./models/user.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger: Logger;
    constructor(@InjectRepository(User, "userConnection") usersRepository: Repository<User>,
        @InjectEntityManager('userConnection') entityManager: EntityManager) {
        super(usersRepository, entityManager)
    }
}