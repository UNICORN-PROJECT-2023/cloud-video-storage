import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entity/customer.entity';

// List of entities
const entities = [CustomerEntity]

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
