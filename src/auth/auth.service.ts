import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(email: string, name: string, password: string)
    {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser)
        {
            throw new BadRequestException("already exist email");
        }

        const user = await this.usersService.create(email, name, password);

        if (!user) {
            throw new BadRequestException('회원가입에 실패했습니다');
          }
        const payload = {sub: user.id, email: user.email, name: user.name};

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {id:user.id, email:user.email, name: user.name},
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다');
          }
        if(!user || !(await this.usersService.validatePassword(user, password)))
        {
            throw new UnauthorizedException("wrong try boy!!!!");
        }

        const payload = {sub: user.id, email: user.email, name: user.name};
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {id: user.id, email: user.email, name: user.name}
        };
    }
}
