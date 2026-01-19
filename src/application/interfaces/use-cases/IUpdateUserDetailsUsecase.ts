export interface IUpdateUserDetailsUsecase {
    execute(userId: string, name: string, email: string): Promise<void>;
}