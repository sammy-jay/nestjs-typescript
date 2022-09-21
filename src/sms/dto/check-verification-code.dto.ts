import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CheckVerificationCodeDto {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  code: string;
}
