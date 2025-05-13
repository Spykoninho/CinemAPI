import {
    Controller,
    Get,
    Param,
    Query,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { IsLoginGuard } from '../../../middlewares/is-login.middleware';
import { ErrorResponse } from '../../../middlewares/exception.model';
import {
    ResponseTransactionDto,
    TransactionRequestDto,
} from './dto/transactions.dto';
import { IsAdminGuard } from '../../../middlewares/is-admin.middleware';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { TransactionsAdapter } from '../adapters/transactions.adapter';
import { RequestWithUser } from '../../../core/interfaces/jwt.interface';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get('/me')
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get all my transactions' })
    @ApiOkResponse({
        description: 'Get my transactions',
        type: ResponseTransactionDto,
    })
    @ApiNotFoundResponse({
        description: 'Get my transactions failed',
        type: ErrorResponse,
    })
    @UseGuards(IsLoginGuard)
    async getMyTransactions(
        @Request() req: RequestWithUser,
        @Query() pagination: Paging,
    ): Promise<Paginated<ResponseTransactionDto>> {
        const [transactions, count] =
            await this.transactionsService.getTransactionsByEmail(
                req.user.email,
                pagination.page,
                pagination.limit,
            );
        return new Paginated(
            TransactionsAdapter.listDomainToResponseTransaction(transactions),
            pagination,
            count,
        );
    }

    @Get('/:email')
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get transactions by email' })
    @ApiOkResponse({
        description: 'Get transactions by email',
        type: ResponseTransactionDto,
    })
    @ApiNotFoundResponse({
        description: 'Get transactions by email failed',
        type: ErrorResponse,
    })
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async getTransactionsByEmail(
        @Param() params: TransactionRequestDto,
        @Query() pagination: Paging,
    ): Promise<Paginated<ResponseTransactionDto>> {
        const [transactions, count] =
            await this.transactionsService.getTransactionsByEmail(
                params.email,
                pagination.page,
                pagination.limit,
            );
        return new Paginated(
            TransactionsAdapter.listDomainToResponseTransaction(transactions),
            pagination,
            count,
        );
    }
}
