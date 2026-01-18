export interface ILoginUserUsecase {
  execute(email: string, password: string): Promise<string>;
}
