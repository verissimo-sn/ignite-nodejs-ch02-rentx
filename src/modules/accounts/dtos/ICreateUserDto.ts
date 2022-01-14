interface ICreateUserDto {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar?: string;
}

export { ICreateUserDto };
