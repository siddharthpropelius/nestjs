import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { User } from '../user.decorator';

@Controller('user')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  public async getAll(): Promise<UserDTO[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(
    @User() user: User,
    @Body() dto: UserDTO,
  ): Promise<UserDTO> {
    return this.serv.create(dto, user);
  }
}
