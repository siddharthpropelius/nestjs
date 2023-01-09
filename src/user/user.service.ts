import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from '../user.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  public async getAll(): Promise<UserDTO[]> {
    return await this.repo
      .find()
      .then((items) => items.map((e) => UserDTO.fromEntity(e)));
  }

  public async create(dto: UserDTO, user: User): Promise<UserDTO> {
    return this.repo
      .save(UserDTO.toEntity(dto, user))
      .then((e) => UserDTO.fromEntity(e));
  }
}
