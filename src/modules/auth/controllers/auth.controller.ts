import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService as AuthService } from '../services/auth.service';
import { ErrorResponse } from 'src/middlewares/exception.model';
import {
    LogInSignInDto,
    LogInSignInDtoOutput,
    RefreshTokenDto,
} from './dto/auth.dto';
import { IsLoginGuard } from 'src/middlewares/is-login.middleware';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    @ApiOperation({ summary: 'Sign in' })
    @ApiOkResponse({
        description: 'Sign in successful',
        type: LogInSignInDtoOutput,
    })
    @ApiNotFoundResponse({ description: 'Sign in failed', type: ErrorResponse })
    async signIn(@Body() body: LogInSignInDto): Promise<LogInSignInDtoOutput> {
        const tokens = await this.authService.signIn(body.email, body.password);
        return tokens;
    }

    @Post('/login')
    @ApiOperation({ summary: 'Log in' })
    @ApiOkResponse({
        description: 'Log in successful',
        type: LogInSignInDtoOutput,
    })
    @ApiNotFoundResponse({ description: 'Log in failed', type: ErrorResponse })
    async logIn(@Body() body: LogInSignInDto): Promise<LogInSignInDtoOutput> {
        const tokens = await this.authService.logIn(body.email, body.password);
        return tokens;
    }

    @Patch('/refresh')
    @ApiOperation({ summary: 'Refresh token' })
    @ApiOkResponse({
        description: 'Refresh token successful',
        type: LogInSignInDtoOutput,
    })
    @ApiNotFoundResponse({
        description: 'Refresh token failed',
        type: ErrorResponse,
    })
    async refresh(
        @Body() body: RefreshTokenDto,
    ): Promise<LogInSignInDtoOutput> {
        return await this.authService.refresh(body.refresh_token);
    }

    @Delete('/logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Logout' })
    @ApiNoContentResponse({ description: 'Logout successful' })
    @UseGuards(IsLoginGuard)
    @ApiBearerAuth()
    @ApiNotFoundResponse({ description: 'Logout failed', type: ErrorResponse })
    async logout(@Body() body: RefreshTokenDto): Promise<void> {
        await this.authService.logout(body.refresh_token);
    }
}
