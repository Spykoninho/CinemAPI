import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Query,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService as UsersService } from '../services/users.service';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/middlewares/exception.model';
import { IsAdminGuard } from 'src/middlewares/is-admin.middleware';
import { IsLoginGuard } from 'src/middlewares/is-login.middleware';
import {
    DepositMoneyDto,
    ResponseUserDto,
    WithdrawMoneyDto,
} from './dto/user.dto';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { RequestWithUser } from '../../../core/interfaces/jwt.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        description: 'Get all users successful',
        type: [ResponseUserDto],
    })
    @ApiNotFoundResponse({
        description: 'Get all users failed',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsLoginGuard)
    async getUsers(
        @Query() pagination: Paging,
    ): Promise<Paginated<ResponseUserDto> | Paginated<[]>> {
        const [users, count] = await this.usersService.getUsers(
            pagination.page,
            pagination.limit,
        );
        return new Paginated(users, pagination, count);
    }

    @Get('me')
    @ApiOperation({ summary: 'Get current user' })
    @ApiOkResponse({
        description: 'Get current user',
        type: ResponseUserDto,
    })
    @ApiNotFoundResponse({
        description: 'Get current user failed',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async getMe(@Request() req: RequestWithUser): Promise<ResponseUserDto> {
        return await this.usersService.getUserByEmail(req.user.email);
    }

    @Get('/:email')
    @ApiOperation({ summary: 'Get user by email' })
    @ApiOkResponse({
        description: 'Get user by email successful',
        type: ResponseUserDto,
    })
    @ApiNotFoundResponse({
        description: 'Get user by email failed',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsLoginGuard)
    async getUsersByEmail(
        @Param('email') email: string,
    ): Promise<ResponseUserDto> {
        return await this.usersService.getUserByEmail(email);
    }

    @Patch('me/money/deposit')
    @ApiOperation({ summary: "Add user's money" })
    @ApiOkResponse({
        description: "Add user's money",
        type: DepositMoneyDto,
    })
    @ApiNotFoundResponse({
        description: "Add user's money failed",
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async addMoney(
        @Request() req: RequestWithUser,
        @Body() body: DepositMoneyDto,
    ): Promise<ResponseUserDto> {
        return await this.usersService.depositMoney(req.user.email, body.money);
    }

    @Patch('me/money/withdraw')
    @ApiOperation({ summary: "withdraw user's money" })
    @ApiOkResponse({
        description: "withdraw user's money",
        type: ResponseUserDto,
    })
    @ApiNotFoundResponse({
        description: "withdraw user's money failed",
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async withdrawMoney(
        @Request() req: RequestWithUser,
        @Body() body: WithdrawMoneyDto,
    ): Promise<ResponseUserDto> {
        return await this.usersService.withdrawMoney(
            req.user.email,
            body.money,
        );
    }
}
