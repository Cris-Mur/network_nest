import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInUserDto {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
