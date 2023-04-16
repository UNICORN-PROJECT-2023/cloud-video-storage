import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterInDto } from 'src/modules/main/dto/user-register-in.dto';
import { Repository } from 'typeorm';
import { CustomerVideoEntity } from '../entity/customer-video.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { VideoEntity } from '../entity/video.entity';
import { VideoType } from '../types/video-type.type';

@Injectable()
export class VideoDao {
  constructor(
    @InjectRepository(CustomerEntity)
    private usersRepository: Repository<CustomerEntity>,
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
    @InjectRepository(CustomerVideoEntity)
    private usersVideoRepository: Repository<CustomerVideoEntity>,
  ) {}

  async findAll(): Promise<VideoEntity[]> {
    return await this.videoRepository.find({relations: ["customerVideoEntity",  "customerVideoEntity.customerEntity"]});
  }

  async findById(id: number): Promise<VideoEntity> {
    const tempVideoEntity = await this.videoRepository.find({relations: ["customerVideoEntity",  "customerVideoEntity.customerEntity"], where: {id: id}});

    // validate if video exists
    if(tempVideoEntity.length === 0) {
      throw new BadRequestException("Video by id not exists");
    }

    return tempVideoEntity[0];
  }

  async add(videoEntity: VideoEntity, cstId: number): Promise<void> {
    const customerEntity: CustomerEntity = await this.usersRepository.findOneBy({id: cstId});

    // save video
    const savedVideoEntity: VideoEntity = await this.videoRepository.save(videoEntity);

    // link customer to video

    const customerVideoEntity = new CustomerVideoEntity(VideoType.OWNER, savedVideoEntity, customerEntity)
    
    await this.usersVideoRepository.save(customerVideoEntity);
  }

  async put(videoEntity: VideoEntity, id: number): Promise<void> {
    const tempVideoEntity = await this.videoRepository.findOneBy({ id: id });
    
    // validate if video exists
    if(!tempVideoEntity) {
      throw new BadRequestException("Video by id not exists");
    }

    console.log(tempVideoEntity)
    console.log(videoEntity)
    const changedVideoEntity = {...tempVideoEntity, ...videoEntity};

    await this.videoRepository.save(changedVideoEntity);
  }

  async delete(id: number): Promise<void> {
    const tempVideoEntity = await this.videoRepository.findOneBy({ id: id });
    
    // validate if video exists
    if(!tempVideoEntity) {
      throw new BadRequestException("Video by id not exists");
    }

    await this.videoRepository.delete({id});
  }
}