export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
