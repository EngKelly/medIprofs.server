import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'Kelly',
    description: 'users username.',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email address.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Nifieoakdfkdafkfadf*&$HIkeifo',
    description: 'Users Password.',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '.assets/upload/user/<username.png',
    description: 'Users Profile image.',
  })
  @IsNotEmpty()
  profileURL: string;

  @ApiProperty({
    example: false,
    description: 'marks user as admin if true.',
  })
  @IsNotEmpty()
  isAdmin: boolean;

  @IsEmpty()
  role: string;
}
