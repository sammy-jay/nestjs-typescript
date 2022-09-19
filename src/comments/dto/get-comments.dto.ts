import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class GetCommentsDto {
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  postId: number;
}

export default GetCommentsDto;
