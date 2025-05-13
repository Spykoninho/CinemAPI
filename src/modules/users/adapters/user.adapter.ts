import { UserEntity } from 'src/core/entities/user.entity';
import { User } from '../domain/user.model';
import { ResponseUserDto } from '../controllers/dto/user.dto';

export class UserAdapter {
    static entityToDomain(userEntity: UserEntity): User {
        return {
            id: userEntity.id,
            email: userEntity.email,
            password: userEntity.password,
            role: userEntity.role,
            money: userEntity.money,
        };
    }

    static entityToResponseUser(userEntity: UserEntity): ResponseUserDto {
        // TODO : mettre par ex transactionEntity, MovieEntity...
        return {
            email: userEntity.email,
            role: userEntity.role,
            money: userEntity.money,
        };
    }
}
