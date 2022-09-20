import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsObject()
  // @IsOptional()
  // categories: any;
}
