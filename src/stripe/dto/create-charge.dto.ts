import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChargeDto {
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @IsNumber()
  amount: number;
}
