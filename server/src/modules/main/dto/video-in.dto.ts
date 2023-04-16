import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class VideoInDto {
  
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({required: true})
  name: string;
  
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsOptional()
  @ApiProperty({required: false})
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  episode: number;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @ApiProperty({required: true})
  originalLink: string;
  
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @ApiProperty({required: true})
  materials: Array<string>;
  
  constructor(name: string, description: string, episode: number, originalLink: string, materials: Array<string>) {
    this.name = name;
    this.description = description;
    this.episode = episode;
    this.originalLink = originalLink;
    this.materials = materials;
  }
}