import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ENTITY
import { UserEntity } from './user.entity';

// DOMAIN
import { DOMAIN } from '../constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userEntity: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }

  async updateUser(userEntity: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }

  async findOne(userEntity: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne(userEntity)
  }

  async deleteUser(ids: number[]): Promise<any> {
    return await this.userRepository.delete(ids);
  }
}
