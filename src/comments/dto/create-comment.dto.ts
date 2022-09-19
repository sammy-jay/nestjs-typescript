import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import ObjectWithIdDto from 'src/utils/types/objectWithId.dto';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  post: ObjectWithIdDto;
}

export default CreateCommentDto;
