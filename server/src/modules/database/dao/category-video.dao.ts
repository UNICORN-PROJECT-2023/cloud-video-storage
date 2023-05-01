import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { CategoryVideoEntity } from '../entity/category-video.entity';
import { VideoEntity } from '../entity/video.entity';

@Injectable()
export class CategoryVideoDao {
  constructor(
    @InjectRepository(CategoryVideoEntity)
    private categoryVideoRepository: Repository<CategoryVideoEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async add(videoId: number, categoryId: number): Promise<void> {
    const tempCategoryVideoEntity: CategoryVideoEntity = await this.categoryVideoRepository.findOne({
      where: {
        videoEntity: {
          id: videoId,
        },
        categoryEntity: {
          id: categoryId,
        },
      },
    });

    if (tempCategoryVideoEntity) {
      throw new ConflictException('Video is already in this category');
    }

    const categoryEntity = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    const videoEntity = await this.videoRepository.findOne({
      where: { id: videoId },
    });

    if (!videoEntity) {
      throw new BadRequestException('Video by id not exists');
    }

    const categoryVideoEntity = new CategoryVideoEntity(videoEntity, categoryEntity);

    await this.categoryVideoRepository.save(categoryVideoEntity);
  }

  async remove(videoId: number, categoryId: number): Promise<void> {
    const tempCategoryVideoEntity: CategoryVideoEntity = await this.categoryVideoRepository.findOne({
      where: {
        videoEntity: {
          id: videoId,
        },
        categoryEntity: {
          id: categoryId,
        },
      },
    });

    if (!tempCategoryVideoEntity) {
      return;
    }

    await this.categoryVideoRepository.delete({ id: tempCategoryVideoEntity.id });
  }
}
