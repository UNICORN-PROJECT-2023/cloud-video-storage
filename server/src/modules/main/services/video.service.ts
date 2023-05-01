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
import { VideoTransformer } from '../transformer/video.transformer';
import { VideoInDto } from '../dto/video-in.dto';
import { VideoType } from 'src/modules/database/types/video-type.type';
import { CategoryVideoDao } from 'src/modules/database/dao/category-video.dao';
import { CategoryDao } from 'src/modules/database/dao/category.dao';


@Injectable()
export class VideoService {

  constructor(
    @Inject(VideoDao)
    private videoDao: VideoDao,
    @Inject(CategoryDao)
    private categoryDao: CategoryDao,
    @Inject(CategoryVideoDao)
    private categoryVideoDao: CategoryVideoDao,
  ) {}
  
  
  async getAllVideosSubscribers(cstId: number): Promise<Array<VideoOutDto>> {
    const videoEntityArray = await this.videoDao.findAll();

    const videoDaoArray: Array<VideoOutDto> = videoEntityArray
      .filter((videoEntity) => videoEntity.customerVideoEntity.find(
        (customer) => customer.customerEntity.id == cstId && customer.type === VideoType.SUBSCRIBER)
      )
      .map(
        (videoEntity) => VideoTransformer.entityToDao(videoEntity)
      ); 

    return videoDaoArray;
  }

  async getAllVideosOwner(cstId: number): Promise<Array<VideoOutDto>> {
    const videoEntityArray = await this.videoDao.findAll();

    const videoDaoArray: Array<VideoOutDto> = videoEntityArray
      .filter((videoEntity) => videoEntity.customerVideoEntity.find(
        (customer) => customer.customerEntity.id == cstId && customer.type === VideoType.OWNER)
      )
      .map(
        (videoEntity) => VideoTransformer.entityToDao(videoEntity)
      ); 

    return videoDaoArray;
  }
  
  async getAllVideos(catId?: number): Promise<Array<VideoOutDto>> {
    const videoEntityArray = await this.videoDao.findAll();

    const videoDaoArray: Array<VideoOutDto> = videoEntityArray
    .filter((videoEntity) => videoEntity.categoryVideoEntity.find((categoryVideo) => catId == undefined || catId == categoryVideo.categoryEntity.id))
    .map((videoEntity) => VideoTransformer.entityToDao(videoEntity)); 

    return videoDaoArray;
  }

  async getVideoById(videoId: number): Promise<VideoOutDto> {
    const videoEntity = await this.videoDao.findById(videoId);

    const video: VideoOutDto = VideoTransformer.entityToDao(videoEntity);

    return video;
  }

  async postVideo(videoDao: VideoInDto, cstId: number): Promise<void> {
    const videoEntity = VideoTransformer.dtoToEntity(videoDao);

    // find and validate categories
    const categoryEntityArray = [];
    for(const category of videoDao.categories) {
      const categoryEntity = await this.categoryDao.findByName(category.name);
      categoryEntityArray.push(categoryEntity);
    }
    
    // save video
    await this.videoDao.add(videoEntity, cstId);

    // save video categories
    const entityPromisses = [];
    for(const categoryEntity of categoryEntityArray)  {
      entityPromisses.push(this.categoryVideoDao.add(videoEntity.id, categoryEntity.id))
    }

    await Promise.all(entityPromisses);
  }


  async putVideo(videoDao: VideoInDto, videoId: number, cstId: number): Promise<void> {
    const videoEntity = VideoTransformer.dtoToEntity(videoDao)

    // validate if user is owner
    const tempVideoEntity = await this.videoDao.findById(videoId);
    const tempVideoDao = VideoTransformer.entityToDao(tempVideoEntity);

    if(tempVideoDao.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    // find and validate categories
    const categoryEntityArray = [];
    for(const category of videoDao.categories) {
      const categoryEntity = await this.categoryDao.findByName(category.name);
      categoryEntityArray.push(categoryEntity);
    }

    // update saved video
    await this.videoDao.put(videoEntity, videoId);


    // delete old video categories
    await this.categoryVideoDao.remove(videoId, undefined);

    // save new video categories
    const entityPromisses = [];
    for(const categoryEntity of categoryEntityArray)  {
      entityPromisses.push(this.categoryVideoDao.add(videoId, categoryEntity.id))
    }

    await Promise.all(entityPromisses);
  }


  async deleteVideo(videoId: number, cstId: number): Promise<void> {
    
    // validate if user is owner
    const tempVideoEntity = await this.videoDao.findById(videoId);
    const tempVideoDao = VideoTransformer.entityToDao(tempVideoEntity);

    if(tempVideoDao.owner.id != cstId)  {
      throw new ForbiddenException("User is not owner");
    }

    await this.videoDao.delete(videoId);
  }

}


