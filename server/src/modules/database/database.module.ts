import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './database.providers';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerDao } from './dao/customer.dao';
import { VideoDao } from './dao/video.dao';
import { CustomerVideoDao } from './dao/customer-video.dao';
import { CategoryDao } from './dao/category.dao';
import { CategoryVideoDao } from './dao/category-video.dao';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerDao,
    VideoDao,
    CustomerVideoDao,
    CategoryDao,
    CategoryVideoDao,
  ],
  exports: [
    CustomerDao,
    VideoDao,
    CustomerVideoDao,
    CategoryDao,
    CategoryVideoDao,
  ],
})
export class DatabaseModule {}
