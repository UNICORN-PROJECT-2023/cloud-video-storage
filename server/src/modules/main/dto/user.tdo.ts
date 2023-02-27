import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsStrongPassword } from "class-validator";

export class UserDto {
  
  @IsEmail()
  @ApiProperty({required: true})
  email: string;

  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string;
}