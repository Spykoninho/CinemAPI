import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'src/modules/users/domain/user-role.enum';
import { RequestWithUser } from '../core/interfaces/jwt.interface';

@Injectable()
export class IsAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;

        return (
            (user && user.role === UserRoleEnum.ADMIN) ||
            user.role === UserRoleEnum.SUPER_ADMIN
        );
    }
}
