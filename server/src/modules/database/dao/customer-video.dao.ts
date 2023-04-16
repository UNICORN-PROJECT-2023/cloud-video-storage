import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterInDto } from 'src/modules/main/dto/user-register-in.dto';
import { Repository } from 'typeorm';
import { CustomerVideoEntity } from '../entity/customer-video.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { VideoEntity } from '../entity/video.entity';
import { VideoType } from '../types/video-type.type';

@Injectable()
export class CustomerVideoDao {
  constructor(
    @InjectRepository(CustomerVideoEntity)
    private usersVideoRepository: Repository<CustomerVideoEntity>,
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

 
  async add(videoId: number, cstId: number): Promise<void> {
    const tempCustomerVideoEntity: CustomerVideoEntity = await this.usersVideoRepository.findOne({where: {
      type: VideoType.SUBSCRIBER,
      videoEntity: {
        id: videoId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(tempCustomerVideoEntity) {
      throw new ConflictException("User already have action on this video")
    }

    const customerEntity = await this.customerRepository.findOneBy({id: cstId});

    const videoEntity = await this.videoRepository.findOneBy({id: videoId});

    if(!videoEntity) {
      throw new BadRequestException("Video by id not exists");
    }

    const customerVideoEntity = new CustomerVideoEntity(VideoType.SUBSCRIBER, videoEntity, customerEntity);

    await this.usersVideoRepository.save(customerVideoEntity);
  }

 
  async delete(videoId: number, cstId: number): Promise<void> {
    const tempCustomerVideoEntity: CustomerVideoEntity = await this.usersVideoRepository.findOne({where: {
      type: VideoType.SUBSCRIBER,
      videoEntity: {
        id: videoId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(!tempCustomerVideoEntity) {
      throw new ConflictException("User dont have action on this video");
    }

    await this.usersVideoRepository.delete({id: tempCustomerVideoEntity.id});
  }
}