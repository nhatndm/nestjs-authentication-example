import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ENTITY
import { UserEntity } from './user.entity';

// CONTROLLER
import { UserController } from './user.controller';

// SERVICES
import { UserService } from './user.service';

// MODULES

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
