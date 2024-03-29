import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { jwtSecret } from '../guard/constant/jwt.constant';
import { UserController } from './controllers/user.controller';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { GuardModule } from '../guard/guard.module';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './services/video.service';
import { VideoListService } from './services/video-list.service';
import { VideoListController } from './controllers/video-list.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [
    DatabaseModule,
    GuardModule
  ],
  controllers: [UserController, VideoController, VideoListController, CategoryController],
  providers: [ UserService, PasswordService, VideoService, VideoListService, CategoryService],
  exports: []
})
export class MainModule {}
