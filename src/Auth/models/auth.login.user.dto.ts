import { ApiProperty } from '@nestjs/swagger';

export class AuthlogInUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
