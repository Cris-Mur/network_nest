import { ApiProperty } from '@nestjs/swagger';

export class UserModelDto {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  post: Array<object>;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty({ nullable: true })
  deleteAt: Date;
}
