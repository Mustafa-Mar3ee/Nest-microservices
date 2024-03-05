import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabsaeModule, LoggerModule } from '@app/common';
import { UserRepository } from './users.repository';
import { User } from './models/user.entity';
import { Role } from './models';

@Module({
  imports: [
    DatabsaeModule,
    DatabsaeModule.forFeature([User, Role], "userConnection"),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule { }
