import { UserRoleEnum } from './user-role.enum';

export class User {
    id: number;
    email: string;
    password: string;
    role: UserRoleEnum;
    money: number;
}
