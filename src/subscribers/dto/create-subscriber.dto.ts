import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
