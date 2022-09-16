import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  @IsOptional()
  categories: any;
}
