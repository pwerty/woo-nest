import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return await this.authService.signup(
            signupDto.email,
            signupDto.name,
            signupDto.password,
        );
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.password);
    }
}
