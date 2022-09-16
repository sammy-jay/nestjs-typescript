import { PartialType } from '@nestjs/mapped-types';
import { Min, IsNotEmpty, IsNumberString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumberString()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
