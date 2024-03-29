import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { VideoOutDto } from '../dto/video-out.dto';
import { VideoInDto } from '../dto/video-in.dto';
import { VideoService } from '../services/video.service';
import { VideoListInDto } from '../dto/video-list.in.dto';
import { VideoListService } from '../services/video-list.service';
import { CategoryService } from '../services/category.service';
import { CategoryOutDto } from '../dto/category.out.dto';

@ApiBearerAuth()
@Controller("/category")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly videoService: VideoService,
    ) {}

  
  @Get("/all")
  async getAllCategories(@Req() req: any): Promise<ResponseDto<Array<CategoryOutDto>>> {

    const categoryDaoArray = await this.categoryService.getAllCategories();

    const response = new ResponseDtoBuilder<Array<CategoryOutDto>>()
    .setStatusCode(200)
    .setMessage("Received all categories")
    .setBody(categoryDaoArray)
    .build();

    return response;
  }

}
