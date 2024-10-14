import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(
    eamil: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(eamil);
    if (user?.password !== password) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 맞지 않습니다.');
    }

    const payload = { email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(userDto: CreateUserDto): Promise<void> {
    await this.usersService.create(userDto);
  }
}
