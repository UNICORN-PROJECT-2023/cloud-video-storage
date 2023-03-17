import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './database.providers';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerDao } from './dao/customer.dao';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerDao
  ],
  exports: [
    CustomerDao
  ],
})
export class DatabaseModule {}
