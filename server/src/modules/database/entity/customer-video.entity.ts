import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { VideoType } from '../types/video-type.type';
import { CustomerEntity } from './customer.entity';
import { VideoEntity } from './video.entity';


@Entity({ name: 'customer_video' })
export class CustomerVideoEntity {
  @PrimaryGeneratedColumn({ name: 'cv_id' })
  id: number;

  @Column({ name: 'cv_type', default: null })
  type: VideoType;

  @ManyToOne(() => VideoEntity, (videoEntity) => videoEntity.id, { onDelete: 'CASCADE' })
  videoEntity: VideoEntity;

  @ManyToOne(() => CustomerEntity, (customerEntity) => customerEntity.id)
  customerEntity: CustomerEntity;

  constructor(type: VideoType, videoEntity: VideoEntity, customerEntity: CustomerEntity) {
    this.type = type;
    this.videoEntity = videoEntity;
    this.customerEntity = customerEntity;
  }

}
