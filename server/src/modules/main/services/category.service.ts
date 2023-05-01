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
import { VideoInDto } from '../dto/video-in.dto';
import { VideoType } from 'src/modules/database/types/video-type.type';
import { CustomerVideoDao } from 'src/modules/database/dao/customer-video.dao';
import { CategoryDao } from 'src/modules/database/dao/category.dao';
import { CategoryOutDto } from '../dto/category.out.dto';
import { CategoryTransformer } from '../transformer/category.transformer';


@Injectable()
export class CategoryService {

  constructor(
    @Inject(VideoDao)
    private videoDao: VideoDao,
    @Inject(CategoryDao)
    private categoryDao: CategoryDao,
  ) {}
  

  async getAllCategories(): Promise<Array<CategoryOutDto>> {
    const categoryEntity = await this.categoryDao.findAll();

    const category: Array<CategoryOutDto> = categoryEntity.map((entity) =>  CategoryTransformer.entityToDao(entity));

    return category;
  }



}


