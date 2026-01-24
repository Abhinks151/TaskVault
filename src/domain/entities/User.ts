export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isSynced: boolean;
  createdAt: Date;
  updatedAt: Date;
}
