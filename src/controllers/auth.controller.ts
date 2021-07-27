import {
    Get,
    Route,
    Tags,
    Post,
    Body,
    Path,
    Security,
    Inject,
    Delete,
} from 'tsoa'
import { User } from '../models'
import { jwtTokens } from '../utils/jwt-helpers'

@Route('auth')
@Tags('Auth')
export default class AuthController {
    @Post('/')
    public async getAccessToken(
        @Body() user: User
    ): Promise<{ accessToken: string; refreshToken: string }> {
        return jwtTokens(user!)
    }

    @Get('/refresh_token')
    public async getRefreshToken(
        @Inject() user: User
    ): Promise<{ accessToken: string; refreshToken: string }> {
        return jwtTokens(user!)
    }

    @Delete('/refresh_token')
    public async deleteRefreshToken() {
        return
    }
}
