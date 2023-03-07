import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './database.providers';
import { CustomerEntity } from './entity/customer.entity';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerService
  ],
  exports: [
    CustomerService
  ],
})
export class DatabaseModule {}
