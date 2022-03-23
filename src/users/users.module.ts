import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entities';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // This step create the repository
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
