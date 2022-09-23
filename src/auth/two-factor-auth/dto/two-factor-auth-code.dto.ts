import { IsNotEmpty, IsNumberString } from 'class-validator';

export class TwoFactorAuthCodeDto {
  @IsNumberString()
  @IsNotEmpty()
  twoFactorAuthCode: string;
}
