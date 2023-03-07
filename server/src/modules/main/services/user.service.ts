import { Inject, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/modules/database/services/customer.service';

@Injectable()
export class UserService {

  constructor(
    @Inject(CustomerService)
    private customerService: CustomerService,
  ) {}
  
  async getMe(): Promise<string> {
    return 'got me';
  }

  async putMe(): Promise<string> {
    return 'updated me';
  }

  async register(): Promise<object> {
    await this.customerService.add();
    return {
      username: 'pepa',
    };
  }

  async login(): Promise<string> {
    return 'logged in';
  }
}
