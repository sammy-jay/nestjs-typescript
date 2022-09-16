import { PartialType } from '@nestjs/mapped-types';
import { Min, IsNotEmpty, IsNumberString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumberString()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
