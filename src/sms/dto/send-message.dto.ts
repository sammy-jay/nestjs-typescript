import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @IsString()
  receiverPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
