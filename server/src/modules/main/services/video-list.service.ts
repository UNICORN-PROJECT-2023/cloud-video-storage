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
import { VideoType } from 'src/modules/database/types/video-type.type';
import { CustomerVideoDao } from 'src/modules/database/dao/customer-video.dao';


@Injectable()
export class VideoListService {

  constructor(
    @Inject(VideoDao)
    private videoDao: VideoDao,
    @Inject(CustomerVideoDao)
    private customerVideoDao: CustomerVideoDao,
  ) {}
  

  async getAllVideosList(cstId: number): Promise<Array<VideoOutDto>> {
    const videoEntityArray = await this.videoDao.findAll();

    const videoDaoArray: Array<VideoOutDto> = videoEntityArray
      .filter((videoEntity) => videoEntity.customerVideoEntity.find(
        (customer) => customer.customerEntity.id == cstId && customer.type === VideoType.SUBSCRIBER)
      )
      .map(
        (videoEntity) => videoTransformer.entityToDao(videoEntity)
      ); 

    return videoDaoArray;
  }


  async postVideoList(videoId: number, cstId: number): Promise<void> {
    await this.customerVideoDao.add(videoId, cstId);
  }


  async deleteVideoList(videoId: number, cstId: number): Promise<void> {
    await this.customerVideoDao.delete(videoId, cstId);
  }

}


