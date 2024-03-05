import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './models/user.entity';
import { Role } from './models';
@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository) { }
    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUser(createUserDto)
        const user = new User({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            roles: createUserDto.roles?.map((roleDto) => new Role({ name: roleDto })),
        })
        console.log("🚀 ~ UsersService ~ create ~ createUserDto:", user)
        return this.usersRepository.create(user)
    }
    private async validateCreateUser(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email })
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException('Email Already exist')
    }
    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email })
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid')
        }
        return user
    }
    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto)
    }

    async findAll() {
        return await this.usersRepository.find({})
    }
}
