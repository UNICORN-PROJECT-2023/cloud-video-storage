import { VideoEntity } from "src/modules/database/entity/video.entity";
import { VideoType } from "src/modules/database/types/video-type.type";
import { VideoInDto } from "../dto/video-in.dto";
import { VideoOutDto } from "../dto/video-out.dto";

export class videoTransformer {

  static daoToEntity(videoDao: VideoInDto): VideoEntity {
    const videoEntity = new VideoEntity(
      videoDao.name,
      videoDao.description,
      videoDao.episode,
      videoDao.originalLink,
      videoDao.materials
    );

    return videoEntity;
  }

  static entityToDao(videoEntity: VideoEntity): VideoOutDto {
    const owner =  videoEntity.customerVideoEntity.find((customerVideo) => customerVideo.type === VideoType.OWNER);
    const subscribers =  videoEntity.customerVideoEntity.filter((customerVideo) => customerVideo.type === VideoType.SUBSCRIBER);

    const videoDao = new VideoOutDto(
      videoEntity.id,
      videoEntity.name,
      videoEntity.description,
      videoEntity.episode,
      videoEntity.originalLink,
      videoEntity.materials,
      {
        id: owner?.customerEntity.id,
        name: owner?.customerEntity.username,
      },
      subscribers.map((subscriber) => {
        return ({
          id: subscriber?.customerEntity?.id,
          name: subscriber?.customerEntity?.username,
        })
      }
        ),
      videoEntity.createdAt,
      videoEntity.updatedAt,
    );

    return videoDao;
  }
}