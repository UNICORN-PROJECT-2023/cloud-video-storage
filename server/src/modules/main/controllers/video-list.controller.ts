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

@ApiBearerAuth()
@Controller("/video/list")
export class VideoListController {
  constructor(private readonly videoListService: VideoListService) {}

  
  @Get("/all")
  @Roles("user")
  async getAllVideos(@Req() req: any): Promise<ResponseDto<Array<VideoOutDto>>> {
    const cstId = req.user.id;

    const videoDaoArray = await this.videoListService.getAllVideosList(cstId);

    const response = new ResponseDtoBuilder<Array<VideoOutDto>>()
    .setStatusCode(200)
    .setMessage("Received all videos")
    .setBody(videoDaoArray)
    .build();

    return response;
  }

  @Post("/:videoId")
  @Roles("user")
  @ApiParam({ name: 'videoId', type: Number })
  async postVideo(@Req() req: any, @Param('videoId') id: number): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    await this.videoListService.postVideoList(id, cstId);

    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Uploaded video from action list")
    .build();

    return response;
  }


  @Delete("/:videoId")
  @Roles("user")
  @ApiParam({ name: 'videoId', type: Number })
  async deleteVideo(@Req() req: any, @Param('videoId') id: number): Promise<ResponseDto<void>> {
    const cstId: number = req.user.id;

    await this.videoListService.deleteVideoList(id, cstId);

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("deleted video from action list")
      .build();
      
    return response;
  }
}
