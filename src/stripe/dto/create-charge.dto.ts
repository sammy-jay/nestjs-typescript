import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsNumber, ValidateNested } from 'class-validator';

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
