export interface Signup {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'unknown';
}

export interface Login {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  permissions?: string[];
}
