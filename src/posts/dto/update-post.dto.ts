import { PartialType } from '@nestjs/mapped-types';
import { IsInt, Min, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
