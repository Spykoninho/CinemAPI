import { UserRoleEnum } from '../../modules/users/domain/user-role.enum';
import { Request } from 'express';

export interface UserDecoded {
    id: number;
    email: string;
    role: UserRoleEnum;
}

export type RequestWithUser = Request & {
    user: {
        email: string;
        role: UserRoleEnum;
    };
};
