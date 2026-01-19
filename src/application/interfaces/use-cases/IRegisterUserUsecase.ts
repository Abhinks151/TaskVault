
export interface IRegisterUserUsecase {
  execute(name: string, email: string, password: string): Promise<void>;
}
