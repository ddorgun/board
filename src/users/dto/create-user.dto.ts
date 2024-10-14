import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '이름' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '나이' })
  @IsNumber()
  age: number;
}
