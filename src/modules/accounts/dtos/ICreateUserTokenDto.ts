interface ICreateUserTokenDto {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}

export { ICreateUserTokenDto };
