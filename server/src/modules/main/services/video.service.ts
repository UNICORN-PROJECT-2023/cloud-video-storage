import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import passport from 'passport';
import { CustomerDao } from 'src/modules/database/dao/customer.dao';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { PasswordService } from './password.service';
import { JwtService } from 'src/modules/guard/service/jwt.service';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { VideoOutDto } from '../dto/video-out.dto';
import { VideoDao } from 'src/modules/database/dao/video.dao';
import { videoTransformer } from '../transformer/video-transformer';
import { VideoInDto } from '../dto/video-in.dto';


@Injectable()
export class VideoService {

  constructor(
    @Inject(VideoDao)
    private videoDao: VideoDao,
  ) {}
  
  async getAllVideos(): Promise<Array<VideoOutDto>> {
    const videoEntityArray = await this.videoDao.findAll();

    const videoDaoArray: Array<VideoOutDto> = videoEntityArray.map((videoEntity) => videoTransformer.entityToDao(videoEntity)); 

    return videoDaoArray;
  }

  async getVideoById(videoId: number): Promise<VideoOutDto> {
    const videoEntity = await this.videoDao.findById(videoId);

    const video: VideoOutDto = videoTransformer.entityToDao(videoEntity);

    return video;
  }

  async postVideo(videoDao: VideoInDto, cstId: number): Promise<void> {
    const videoEntity = videoTransformer.daoToEntity(videoDao);
    await this.videoDao.add(videoEntity, cstId);
  }


  async putVideo(videoDao: VideoInDto, videoId: number, cstId: number): Promise<void> {
    const videoEntity = videoTransformer.daoToEntity(videoDao)

    // validate if user is owner
    const tempVideoEntity = await this.videoDao.findById(videoId);
    const tempVideoDao = videoTransformer.entityToDao(tempVideoEntity);

    if(tempVideoDao.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    await this.videoDao.put(videoEntity, videoId);
  }


  async deleteVideo(videoId: number, cstId: number): Promise<void> {
    
    // validate if user is owner
    const tempVideoEntity = await this.videoDao.findById(videoId);
    const tempVideoDao = videoTransformer.entityToDao(tempVideoEntity);

    if(tempVideoDao.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    await this.videoDao.delete(videoId);
  }

}


