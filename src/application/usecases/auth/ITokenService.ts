export interface ITokenService {
  generateToken(payload: { userId: string; role: string }): string;
}
