import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerVideoEntity } from './entity/customer-video.entity';
import { CustomerEntity } from './entity/customer.entity';
import { VideoEntity } from './entity/video.entity';

// List of entities
const entities = [CustomerEntity, VideoEntity, CustomerVideoEntity]

export const Provider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'Admin',
    password: '1234',
    database: 'postgres',
    entities: entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities)
];
