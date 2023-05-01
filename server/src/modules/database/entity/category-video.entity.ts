import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { VideoType } from '../types/video-type.type';
import { CustomerEntity } from './customer.entity';
import { VideoEntity } from './video.entity';
import { CategoryEntity } from './category.entity';


@Entity({ name: 'category_video' })
export class CategoryVideoEntity {
  @PrimaryGeneratedColumn({ name: 'cav_id' })
  id: number;

  @ManyToOne(() => VideoEntity, (videoEntity) => videoEntity.id, { onDelete: 'CASCADE' })
  videoEntity: VideoEntity;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.id)
  categoryEntity: CategoryEntity;

  constructor(videoEntity: VideoEntity, categoryEntity: CategoryEntity) {
    this.videoEntity = videoEntity;
    this.categoryEntity = categoryEntity;
  }

}
