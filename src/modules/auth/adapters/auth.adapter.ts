import { UserEntity } from 'src/core/entities/user.entity';
import { LogInSignInDtoOutput } from '../controllers/dto/auth.dto';
import { User } from 'src/modules/users/domain/user.model';

export class AuthAdapter {
    static entityToDomain(userEntity: UserEntity): User {
        return {
            id: userEntity.id,
            email: userEntity.email,
            password: userEntity.password,
            role: userEntity.role,
            money: userEntity.money,
        };
    }

    static SignToDtoOutput(
        access_token: string,
        refresh_token: string,
    ): LogInSignInDtoOutput {
        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }
}
