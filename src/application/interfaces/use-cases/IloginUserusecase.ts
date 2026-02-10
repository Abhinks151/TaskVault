export interface ILoginUserUsecase {
  execute(email: string, password: string): Promise<LoginResponse>;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
