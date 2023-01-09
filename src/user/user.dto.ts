import { IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { User } from '../user.decorator';

export class UserDTO implements Readonly<UserDTO> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  public static from(dto: Partial<UserDTO>) {
    const it = new UserDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
    });
  }

  public static toEntity(dto: Partial<UserDTO>, user: User = null) {
    const it = new UserEntity();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }
}
