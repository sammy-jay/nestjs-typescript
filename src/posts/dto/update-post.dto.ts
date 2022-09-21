import { Min, IsNotEmpty, IsInt } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
