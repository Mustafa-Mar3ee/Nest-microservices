import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.gaurd';
import { User } from './models/user.entity';
import { Roles } from '@app/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {

    }
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return this.userService.create(createUser)

    }
    @Get('all')
    @UseGuards(JwtAuthGuard)
    @Roles('Admin')
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: User) {
        return user
    }
}
