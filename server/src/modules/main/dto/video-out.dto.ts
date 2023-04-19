import { ApiProperty } from "@nestjs/swagger";

export class VideoOutDto {

  @ApiProperty({required: true})
  id: number;

  @ApiProperty({required: true})
  name: string;
  
  @ApiProperty({required: true})
  description: string;

  @ApiProperty({required: true})
  episode: number;

  @ApiProperty({required: true})
  originalLink: string;
  
  @ApiProperty({required: true})
  materials: Array<string>;

  @ApiProperty({required: true})
  owner: {
    id: number,
    name: string,
  }

  @ApiProperty({required: true})
  subscribers: Array<{
    id: number,
    name: string,
  }>

  @ApiProperty({required: true})
  createdAt: Date;

  @ApiProperty({required: true})
  updatedAt: Date;
  
  constructor(id: number, name: string, description: string, episode: number, originalLink: string, materials: Array<string>, owner: {id: number, name: string}, subscribers: Array<{id: number, name: string}>, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.episode = episode;
    this.originalLink = originalLink;
    this.materials = materials;
    this.owner = owner;
    this.subscribers = subscribers;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}