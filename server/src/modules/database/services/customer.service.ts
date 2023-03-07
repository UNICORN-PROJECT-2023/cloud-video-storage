import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private usersRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<CustomerEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async add(): Promise<void> {
    const customer = new CustomerEntity();
    customer.username = "alex";
    customer.password = "1234";

    await this.usersRepository.save(customer)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}