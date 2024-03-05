import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { User } from '../../../../apps/auth/src/users/models/user.entity';
import { Product } from 'apps/products/src/models/product.entity';
import { Role } from 'apps/auth/src/users/models';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'userConnection',
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                port: configService.get('DB_PORT'),
                host: configService.get('DB_HOST'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: 'postgres',
                entities: [User, Role],
                synchronize: configService.get('DB_SYNCHRONIZE'),
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            name: 'productConnection',
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                port: configService.get('DB_PORT'),
                host: configService.get('DB_HOST'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: 'postgres',
                entities: [Product],
                synchronize: configService.get('DB_SYNCHRONIZE'),
            }),
            inject: [ConfigService]
        }),


    ]
})
export class DatabsaeModule {
    static forFeature(models: EntityClassOrSchema[], name) {
        return TypeOrmModule.forFeature(models, name)
    }
}
