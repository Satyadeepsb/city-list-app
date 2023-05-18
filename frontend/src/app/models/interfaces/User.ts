export interface User {
  id: number;
  email: string;
  accessToken: string;
  roles: string[];
  tokenType: string;
  username: string;
}
