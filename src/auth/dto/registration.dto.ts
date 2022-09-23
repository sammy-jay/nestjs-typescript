import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}
export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{11,14}$/)
  phoneNumber: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
