interface Address {
  street: string;
  city: string;
  country: string;
}
export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  address: Address;
}
