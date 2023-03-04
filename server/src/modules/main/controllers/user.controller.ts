import { Body, Controller, Get, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UserDto } from '../dto/user.tdo';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@UseGuards()
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @Roles("user")
  async getMe(): Promise<string> {
    return await this.userService.getMe();
  }

  @Put("me")
  @Roles("user")
  async putMe(): Promise<string> {
    return await this.userService.putMe();
  }

  @Post("login")
  async login( @Body() userDto: UserDto ): Promise<string> {
    return await this.userService.login();
  }

  @Post("register")
  async register( @Body() userDto: UserDto ): Promise<object> {
    return await this.userService.register();
  }
}
