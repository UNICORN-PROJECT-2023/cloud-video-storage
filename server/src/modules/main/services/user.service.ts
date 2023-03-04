import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  
  async getMe(): Promise<string> {
    return 'got me';
  }

  async putMe(): Promise<string> {
    return 'updated me';
  }

  async register(): Promise<object> {
    return {
      username: 'pepa',
    };
  }

  async login(): Promise<string> {
    return 'logged in';
  }
}
