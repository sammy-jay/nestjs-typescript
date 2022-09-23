import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class Item {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
export class CreateIntentDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Item)
  items: Item[];
}
