import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerVideoEntity } from './entity/customer-video.entity';
import { CustomerEntity } from './entity/customer.entity';
import { VideoEntity } from './entity/video.entity';
import { CategoryEntity } from './entity/category.entity';
import { CategoryVideoEntity } from './entity/category-video.entity';

// List of entities
const entities = [CustomerEntity, VideoEntity, CustomerVideoEntity, CategoryEntity, CategoryVideoEntity]

export const Provider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_HOST) || 5432,
    username: process.env.POSTGRES_USER || 'Admin',
    password: process.env.POSTGRES_PASSWORD || '1234',
    database: process.env.POSTGERS_DATABASE || 'postgres',
    entities: entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities)
];
