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

@ApiBearerAuth()
@Controller("/video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  
  @Get("/all")
  @Roles("user")
  async getAllVideos(@Req() req: any): Promise<ResponseDto<Array<VideoOutDto>>> {
    const videoDaoArray = await this.videoService.getAllVideos();

    const response = new ResponseDtoBuilder<Array<VideoOutDto>>()
    .setStatusCode(200)
    .setMessage("Received all videos")
    .setBody(videoDaoArray)
    .build();

    return response;
  }

  @Get("/:videoId")
  @Roles("user")
  @ApiParam({ name: 'videoId', type: Number })
  async getVideo(@Req() req: any, @Param('videoId') id: number): Promise<ResponseDto<VideoOutDto>> {
    console.log(id);
    const videoDao = await this.videoService.getVideoById(id);
    
    const response = new ResponseDtoBuilder<VideoOutDto>()
    .setStatusCode(200)
    .setMessage("Received video")
    .setBody(videoDao)
    .build();

    return response;
  }

  @Post("/")
  @Roles("user")
  async postVideo(@Req() req: any, @Body() videoDto: VideoInDto): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    await this.videoService.postVideo(videoDto, cstId);

    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Uploaded video")
    .build();

    return response;
  }

  @Put("/:videoId")
  @Roles("user")
  @ApiParam({ name: 'videoId', type: Number })
  async putVideo(@Req() req: any, @Param('videoId') id: number, @Body() videoDto: VideoInDto): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    await this.videoService.putVideo(videoDto, id, cstId);

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Updated video")
      .build();

    return response;
  }

  @Delete("/:videoId")
  @Roles("user")
  @ApiParam({ name: 'videoId', type: Number })
  async deleteVideo(@Req() req: any, @Param('videoId') id: number): Promise<ResponseDto<void>> {
    const cstId: number = req.user.id;

    await this.videoService.deleteVideo(id, cstId);

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("deleted video")
      .build();
      
    return response;
  }
}
