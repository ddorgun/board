import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 맞지 않습니다.');
    }

    const payload = { email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(userDto: CreateUserDto): Promise<User> {
    const password = userDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.usersService.create({
      ...userDto,
      password: hash,
    });
  }
}
