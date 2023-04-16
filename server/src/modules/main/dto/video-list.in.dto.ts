import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { VideoAction } from "../type/video-action.type";

export class VideoListInDto {
    
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @ApiProperty({required: true})
  action: VideoAction;
  
  constructor(action: VideoAction) {
    this.action = action;
  }
}