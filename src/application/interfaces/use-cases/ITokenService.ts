export interface ITokenService {
  generateAccessToken(payload: { userId: string; role: string }): string;
  generateRefreshToken(payload: { userId: string; role: string }): string;
  verifyAccessToken(token: string): { userId: string; role: string };
  verifyRefreshToken(token: string): { userId: string; role: string };
}
